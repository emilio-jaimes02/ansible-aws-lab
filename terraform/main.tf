terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source = "hashicorp/aws"
    }

    local = {
      source = "hashicorp/local"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Busca la imagen más reciente de Ubuntu Server 24.04 LTS.
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name = "name"
    values = [
      "ubuntu/images/hvm-ssd*/ubuntu-noble-24.04-amd64-server-*"
    ]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

# Obtiene la VPC predeterminada de la región.
data "aws_vpc" "default" {
  default = true
}

# Grupo de seguridad para SSH y HTTP.
resource "aws_security_group" "web_server" {
  name        = "ansible-web-server-sg"
  description = "Permite conexiones SSH y HTTP"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH desde mi equipo"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  ingress {
    description = "Pagina web HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Permitir trafico de salida"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ansible-web-server-sg"
  }
}

# Instancia EC2 administrada por Terraform.
resource "aws_instance" "web_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.web_server.id]
  associate_public_ip_address = true

  tags = {
    Name        = "Terraform-Ansible-Web"
    Environment = "Practica"
    ManagedBy   = "Terraform"
  }
}

# Crea automáticamente el inventario de Ansible.
resource "local_file" "ansible_inventory" {
  filename = "${path.module}/../ansible/inventory.ini"

  content = <<-EOT
[aws_servers]
web1 ansible_host=${aws_instance.web_server.public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=${abspath("${path.module}/../ansible-aws-key.pem")}

[aws_servers:vars]
ansible_python_interpreter=/usr/bin/python3
EOT
}
