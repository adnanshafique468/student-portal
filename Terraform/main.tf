provider "aws" {
  region = var.aws_region
}

# S3 Bucket (eu-north-1 specific config)
resource "aws_s3_bucket" "student_bucket" {
  bucket = "student-portal-${random_id.bucket_suffix.hex}-${var.aws_region}"
  
  tags = {
    Name        = "Student Portal Bucket"
    Environment = var.environment
    Region      = var.aws_region
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# S3 Bucket ownership controls (required for eu-north-1)
resource "aws_s3_bucket_ownership_controls" "student_bucket_ownership" {
  bucket = aws_s3_bucket.student_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Public access block (security)
resource "aws_s3_bucket_public_access_block" "student_bucket_access" {
  bucket = aws_s3_bucket.student_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CORS configuration for S3 (important for direct uploads)
resource "aws_s3_bucket_cors_configuration" "student_bucket_cors" {
  bucket = aws_s3_bucket.student_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]  # In production, replace with your domain
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# DynamoDB Tables with eu-north-1 settings
resource "aws_dynamodb_table" "students" {
  name           = "students-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"  # On-demand pricing
  hash_key       = "studentId"
  
  attribute {
    name = "studentId"
    type = "S"
  }
  
  # Enable point-in-time recovery (backup)
  point_in_time_recovery {
    enabled = true
  }
  
  tags = {
    Name        = "Students Table"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "attendance" {
  name           = "attendance-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "studentId"
  range_key      = "date"
  
  attribute {
    name = "studentId"
    type = "S"
  }
  
  attribute {
    name = "date"
    type = "S"
  }
  
  point_in_time_recovery {
    enabled = true
  }
  
  tags = {
    Name        = "Attendance Table"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "marks" {
  name           = "marks-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "studentId"
  range_key      = "subject"
  
  attribute {
    name = "studentId"
    type = "S"
  }
  
  attribute {
    name = "subject"
    type = "S"
  }
  
  point_in_time_recovery {
    enabled = true
  }
  
  tags = {
    Name        = "Marks Table"
    Environment = var.environment
  }
}

# Outputs
output "bucket_name" {
  value = aws_s3_bucket.student_bucket.id
  description = "S3 Bucket name for student documents"
}

output "students_table_name" {
  value = aws_dynamodb_table.students.name
  description = "DynamoDB Students table name"
}

output "attendance_table_name" {
  value = aws_dynamodb_table.attendance.name
  description = "DynamoDB Attendance table name"
}

output "marks_table_name" {
  value = aws_dynamodb_table.marks.name
  description = "DynamoDB Marks table name"
}

output "aws_region" {
  value = var.aws_region
  description = "AWS Region being used"
}