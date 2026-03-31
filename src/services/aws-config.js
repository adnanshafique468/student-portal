// import { S3Client } from "@aws-sdk/client-s3";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// // AWS Configuration - eu-north-1
// const REGION = import.meta.env.VITE_AWS_REGION || "eu-north-1";  // Updated

// // S3 Client with eu-north-1 optimizations
// export const s3Client = new S3Client({
//   region: REGION,
//   credentials: {
//     accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
//     secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
//   },
//   // Recommended settings for eu-north-1
//   maxAttempts: 3,
//   retryMode: 'adaptive'
// });

// // DynamoDB Client
// const dynamoClient = new DynamoDBClient({
//   region: REGION,
//   credentials: {
//     accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
//     secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
//   }
// });

// export const docClient = DynamoDBDocumentClient.from(dynamoClient);

// // Table names (with environment suffix)
// const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "production";
// export const STUDENTS_TABLE = import.meta.env.VITE_STUDENTS_TABLE || `students-${ENVIRONMENT}`;
// export const ATTENDANCE_TABLE = import.meta.env.VITE_ATTENDANCE_TABLE || `attendance-${ENVIRONMENT}`;
// export const MARKS_TABLE = import.meta.env.VITE_MARKS_TABLE || `marks-${ENVIRONMENT}`;
// export const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;


import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = import.meta.env.VITE_AWS_REGION || "eu-north-1";

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
});

const dynamoClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
});

export const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const STUDENTS_TABLE = import.meta.env.VITE_STUDENTS_TABLE;
export const ATTENDANCE_TABLE = import.meta.env.VITE_ATTENDANCE_TABLE;
export const MARKS_TABLE = import.meta.env.VITE_MARKS_TABLE;
export const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;