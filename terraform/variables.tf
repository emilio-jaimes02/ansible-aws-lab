variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-west-1"
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Nombre del key pair existente en AWS"
  type        = string
  default     = "ansible-aws-key"
}

variable "ssh_cidr" {
  description = "Dirección IP autorizada para conectarse por SSH"
  type        = string
}
