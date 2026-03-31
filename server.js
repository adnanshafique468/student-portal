import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// AWS Clients
const s3Client = new S3Client({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
});

const dynamoClient = new DynamoDBClient({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
});

const docClient = DynamoDBDocumentClient.from(dynamoClient);

// Multer setup for file upload
const upload = multer({ storage: multer.memoryStorage() });

// ============ API ENDPOINTS ============

// Students
app.post('/api/students', async (req, res) => {
  try {
    const studentData = {
      studentId: `STU_${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    const command = new PutCommand({
      TableName: process.env.VITE_STUDENTS_TABLE,
      Item: studentData
    });
    
    await docClient.send(command);
    res.json({ success: true, studentId: studentData.studentId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: process.env.VITE_STUDENTS_TABLE
    });
    const response = await docClient.send(command);
    res.json(response.Items || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const command = new PutCommand({
      TableName: process.env.VITE_ATTENDANCE_TABLE,
      Item: {
        ...req.body,
        markedAt: new Date().toISOString()
      }
    });
    await docClient.send(command);
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/attendance/:studentId', async (req, res) => {
  try {
    const command = new QueryCommand({
      TableName: process.env.VITE_ATTENDANCE_TABLE,
      KeyConditionExpression: "studentId = :studentId",
      ExpressionAttributeValues: {
        ":studentId": req.params.studentId
      }
    });
    const response = await docClient.send(command);
    res.json(response.Items || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Marks
app.post('/api/marks', async (req, res) => {
  try {
    const marksData = {
      ...req.body,
      percentage: (req.body.marks / req.body.totalMarks) * 100,
      updatedAt: new Date().toISOString()
    };
    
    const command = new PutCommand({
      TableName: process.env.VITE_MARKS_TABLE,
      Item: marksData
    });
    await docClient.send(command);
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/marks/:studentId', async (req, res) => {
  try {
    const command = new QueryCommand({
      TableName: process.env.VITE_MARKS_TABLE,
      KeyConditionExpression: "studentId = :studentId",
      ExpressionAttributeValues: {
        ":studentId": req.params.studentId
      }
    });
    const response = await docClient.send(command);
    res.json(response.Items || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// File Upload to S3
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { studentId, type } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const key = `${studentId}/${type}/${Date.now()}_${file.originalname}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.VITE_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    });
    
    await s3Client.send(command);
    
    const fileUrl = `https://${process.env.VITE_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/${key}`;
    res.json({ success: true, url: fileUrl });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});