output "instance_id" {
  description = "ID de la instancia EC2"
  value       = aws_instance.web_server.id
}

output "public_ip" {
  description = "IP pública de la instancia"
  value       = aws_instance.web_server.public_ip
}

output "website_url" {
  description = "Dirección de la página web"
  value       = "http://${aws_instance.web_server.public_ip}/Encriptador/"
}
