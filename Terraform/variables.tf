variable "aws_region" {
  description = "AWS region"
  default     = "eu-north-1"  # Stockholm, Sweden region
}

variable "environment" {
  description = "Environment name"
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  default     = "student-portal"
}