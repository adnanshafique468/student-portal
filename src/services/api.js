// import { docClient, STUDENTS_TABLE, ATTENDANCE_TABLE, MARKS_TABLE, s3Client, BUCKET_NAME } from './aws-config';
// import { PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

// // ============ STUDENT APIs ============

// // Register new student
// export async function registerStudent(studentData) {
//   const command = new PutCommand({
//     TableName: STUDENTS_TABLE,
//     Item: {
//       studentId: `STU_${Date.now()}`,
//       ...studentData,
//       createdAt: new Date().toISOString(),
//       status: 'active'
//     }
//   });
//   return await docClient.send(command);
// }

// // Get all students
// export async function getAllStudents() {
//   const command = new ScanCommand({
//     TableName: STUDENTS_TABLE
//   });
//   const response = await docClient.send(command);
//   return response.Items;
// }

// // Get student by ID
// export async function getStudentById(studentId) {
//   const command = new GetCommand({
//     TableName: STUDENTS_TABLE,
//     Key: { studentId }
//   });
//   const response = await docClient.send(command);
//   return response.Item;
// }

// // Update student
// export async function updateStudent(studentId, updates) {
//   const updateExpression = "set " + Object.keys(updates).map(key => `${key} = :${key}`).join(", ");
//   const expressionValues = {};
//   Object.keys(updates).forEach(key => {
//     expressionValues[`:${key}`] = updates[key];
//   });

//   const command = new UpdateCommand({
//     TableName: STUDENTS_TABLE,
//     Key: { studentId },
//     UpdateExpression: updateExpression,
//     ExpressionAttributeValues: expressionValues
//   });
//   return await docClient.send(command);
// }

// // Delete student
// export async function deleteStudent(studentId) {
//   const command = new DeleteCommand({
//     TableName: STUDENTS_TABLE,
//     Key: { studentId }
//   });
//   return await docClient.send(command);
// }

// // ============ ATTENDANCE APIs ============

// // Mark attendance
// export async function markAttendance(attendanceData) {
//   const command = new PutCommand({
//     TableName: ATTENDANCE_TABLE,
//     Item: {
//       ...attendanceData,
//       markedAt: new Date().toISOString()
//     }
//   });
//   return await docClient.send(command);
// }

// // Get student attendance
// export async function getStudentAttendance(studentId) {
//   const command = new QueryCommand({
//     TableName: ATTENDANCE_TABLE,
//     KeyConditionExpression: "studentId = :studentId",
//     ExpressionAttributeValues: {
//       ":studentId": studentId
//     }
//   });
//   const response = await docClient.send(command);
//   return response.Items;
// }

// // ============ MARKS APIs ============

// // Add marks
// export async function addMarks(marksData) {
//   const command = new PutCommand({
//     TableName: MARKS_TABLE,
//     Item: {
//       ...marksData,
//       percentage: (marksData.marks / marksData.totalMarks) * 100,
//       updatedAt: new Date().toISOString()
//     }
//   });
//   return await docClient.send(command);
// }

// // Get student marks
// export async function getStudentMarks(studentId) {
//   const command = new QueryCommand({
//     TableName: MARKS_TABLE,
//     KeyConditionExpression: "studentId = :studentId",
//     ExpressionAttributeValues: {
//       ":studentId": studentId
//     }
//   });
//   const response = await docClient.send(command);
//   return response.Items;
// }

// // ============ FILE UPLOAD APIs ============

// // Upload file to S3
// export async function uploadFile(file, studentId, fileType) {
//   const key = `${studentId}/${fileType}/${Date.now()}_${file.name}`;
//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: key,
//     Body: file,
//     ContentType: file.type
//   });
  
//   await s3Client.send(command);
//   return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
// }


// // aws-api.js
// import { docClient, STUDENTS_TABLE, ATTENDANCE_TABLE, MARKS_TABLE, s3Client, BUCKET_NAME } from './aws-config';
// import { PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

// // ============ STUDENT APIs ============

// // Register new student
// export async function registerStudent(studentData) {
//   const command = new PutCommand({
//     TableName: STUDENTS_TABLE,
//     Item: {
//       studentId: `STU_${Date.now()}`,
//       ...studentData,
//       createdAt: new Date().toISOString(),
//       status: 'active'
//     }
//   });
//   return await docClient.send(command);
// }

// // Get all students
// export async function getAllStudents() {
//   const command = new ScanCommand({ TableName: STUDENTS_TABLE });
//   const response = await docClient.send(command);
//   return response.Items;
// }

// // Get student by ID
// export async function getStudentById(studentId) {
//   const command = new GetCommand({ TableName: STUDENTS_TABLE, Key: { studentId } });
//   const response = await docClient.send(command);
//   return response.Item;
// }

// // Update student
// export async function updateStudent(studentId, updates) {
//   const updateExpression = "set " + Object.keys(updates).map(key => `${key} = :${key}`).join(", ");
//   const expressionValues = {};
//   Object.keys(updates).forEach(key => { expressionValues[`:${key}`] = updates[key]; });

//   const command = new UpdateCommand({
//     TableName: STUDENTS_TABLE,
//     Key: { studentId },
//     UpdateExpression: updateExpression,
//     ExpressionAttributeValues: expressionValues
//   });
//   return await docClient.send(command);
// }

// // Delete student
// export async function deleteStudent(studentId) {
//   const command = new DeleteCommand({ TableName: STUDENTS_TABLE, Key: { studentId } });
//   return await docClient.send(command);
// }

// // ============ ATTENDANCE APIs ============

// // Mark attendance
// export async function markAttendance(attendanceData) {
//   const command = new PutCommand({
//     TableName: ATTENDANCE_TABLE,
//     Item: { ...attendanceData, markedAt: new Date().toISOString() }
//   });
//   return await docClient.send(command);
// }

// // Get student attendance
// export async function getStudentAttendance(studentId) {
//   const command = new QueryCommand({
//     TableName: ATTENDANCE_TABLE,
//     KeyConditionExpression: "studentId = :studentId",
//     ExpressionAttributeValues: { ":studentId": studentId }
//   });
//   const response = await docClient.send(command);
//   return response.Items;
// }

// // ============ MARKS APIs ============

// // Add marks
// export async function addMarks(marksData) {
//   const command = new PutCommand({
//     TableName: MARKS_TABLE,
//     Item: {
//       ...marksData,
//       percentage: (marksData.marks / marksData.totalMarks) * 100,
//       updatedAt: new Date().toISOString()
//     }
//   });
//   return await docClient.send(command);
// }

// // Get student marks
// export async function getStudentMarks(studentId) {
//   const command = new QueryCommand({
//     TableName: MARKS_TABLE,
//     KeyConditionExpression: "studentId = :studentId",
//     ExpressionAttributeValues: { ":studentId": studentId }
//   });
//   const response = await docClient.send(command);
//   return response.Items;
// }

// // ============ FILE UPLOAD APIs ============

// // Upload file (image/document) to S3
// export async function uploadFile(file, studentId, fileType) {
//   // Create a unique key for the file
//   const key = `${studentId}/${fileType}/${Date.now()}_${file.name}`;

//   // Convert file to ReadableStream for browser
//   const fileStream = file.stream(); // ✅ This fixes .getReader() error

//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: key,
//     Body: fileStream,      // pass ReadableStream
//     ContentType: file.type
//   });

//   await s3Client.send(command);

//   // Return the public URL of uploaded file
//   return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
// }



// // Simple API without AWS SDK complexity
// const REGION = import.meta.env.VITE_AWS_REGION;
// const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;

// // ============ STUDENTS ============
// export async function registerStudent(studentData) {
//   try {
//     const response = await fetch('http://localhost:3000/api/students', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(studentData)
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export async function getAllStudents() {
//   try {
//     const response = await fetch('http://localhost:3000/api/students');
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     return [];
//   }
// }

// // ============ ATTENDANCE ============
// export async function markAttendance(data) {
//   try {
//     const response = await fetch('http://localhost:3000/api/attendance', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export async function getStudentAttendance(studentId) {
//   try {
//     const response = await fetch(`http://localhost:3000/api/attendance/${studentId}`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     return [];
//   }
// }

// // ============ MARKS ============
// export async function addMarks(data) {
//   try {
//     const response = await fetch('http://localhost:3000/api/marks', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export async function getStudentMarks(studentId) {
//   try {
//     const response = await fetch(`http://localhost:3000/api/marks/${studentId}`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     return [];
//   }
// }

// // ============ SIMPLE FILE UPLOAD ============
// export async function uploadFile(file, studentId, type) {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('studentId', studentId);
//     formData.append('type', type);

//     const response = await fetch('http://localhost:3000/api/upload', {
//       method: 'POST',
//       body: formData
//     });

//     const data = await response.json();
//     return data.url;
//   } catch (error) {
//     console.error('Upload error:', error);
//     throw error;
//   }
// }



// import { docClient, STUDENTS_TABLE, ATTENDANCE_TABLE, MARKS_TABLE, s3Client, BUCKET_NAME } from './aws-config';
// import { PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

// // ============ STUDENT APIS ============

// export async function registerStudent(studentData) {
//   try {
//     const command = new PutCommand({
//       TableName: STUDENTS_TABLE,
//       Item: {
//         studentId: `STU_${Date.now()}`,
//         ...studentData,
//         createdAt: new Date().toISOString(),
//         status: 'active'
//       }
//     });
//     return await docClient.send(command);
//   } catch (error) {
//     console.error("Student registration error:", error);
//     throw error;
//   }
// }

// export async function getAllStudents() {
//   try {
//     const command = new ScanCommand({
//       TableName: STUDENTS_TABLE
//     });
//     const response = await docClient.send(command);
//     return response.Items || [];
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     return [];
//   }
// }

// export async function getStudentById(studentId) {
//   try {
//     const command = new GetCommand({
//       TableName: STUDENTS_TABLE,
//       Key: { studentId }
//     });
//     const response = await docClient.send(command);
//     return response.Item;
//   } catch (error) {
//     console.error("Error fetching student:", error);
//     return null;
//   }
// }

// // ============ ATTENDANCE APIS ============

// export async function markAttendance(attendanceData) {
//   try {
//     const command = new PutCommand({
//       TableName: ATTENDANCE_TABLE,
//       Item: {
//         studentId: attendanceData.studentId,
//         date: attendanceData.date,
//         status: attendanceData.status,
//         markedAt: new Date().toISOString()
//       }
//     });
//     return await docClient.send(command);
//   } catch (error) {
//     console.error("Mark attendance error:", error);
//     throw error;
//   }
// }

// export async function getStudentAttendance(studentId) {
//   try {
//     const command = new QueryCommand({
//       TableName: ATTENDANCE_TABLE,
//       KeyConditionExpression: "studentId = :studentId",
//       ExpressionAttributeValues: {
//         ":studentId": studentId
//       }
//     });
//     const response = await docClient.send(command);
//     return response.Items || [];
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     return [];
//   }
// }

// export async function getAttendanceByDate(date) {
//   try {
//     const command = new ScanCommand({
//       TableName: ATTENDANCE_TABLE,
//       FilterExpression: "date = :date",
//       ExpressionAttributeValues: {
//         ":date": date
//       }
//     });
//     const response = await docClient.send(command);
//     return response.Items || [];
//   } catch (error) {
//     console.error("Error fetching attendance by date:", error);
//     return [];
//   }
// }

// // ============ MARKS APIS ============

// export async function addMarks(marksData) {
//   try {
//     const percentage = (marksData.marks / marksData.totalMarks) * 100;
//     const command = new PutCommand({
//       TableName: MARKS_TABLE,
//       Item: {
//         studentId: marksData.studentId,
//         subject: marksData.subject,
//         marks: marksData.marks,
//         totalMarks: marksData.totalMarks,
//         percentage: percentage,
//         updatedAt: new Date().toISOString()
//       }
//     });
//     return await docClient.send(command);
//   } catch (error) {
//     console.error("Add marks error:", error);
//     throw error;
//   }
// }

// export async function getStudentMarks(studentId) {
//   try {
//     const command = new QueryCommand({
//       TableName: MARKS_TABLE,
//       KeyConditionExpression: "studentId = :studentId",
//       ExpressionAttributeValues: {
//         ":studentId": studentId
//       }
//     });
//     const response = await docClient.send(command);
//     return response.Items || [];
//   } catch (error) {
//     console.error("Error fetching marks:", error);
//     return [];
//   }
// }

// export async function updateMarks(studentId, subject, marks, totalMarks) {
//   try {
//     const percentage = (marks / totalMarks) * 100;
//     const command = new UpdateCommand({
//       TableName: MARKS_TABLE,
//       Key: { 
//         studentId: studentId,
//         subject: subject
//       },
//       UpdateExpression: "set marks = :marks, totalMarks = :totalMarks, percentage = :percentage, updatedAt = :updatedAt",
//       ExpressionAttributeValues: {
//         ":marks": marks,
//         ":totalMarks": totalMarks,
//         ":percentage": percentage,
//         ":updatedAt": new Date().toISOString()
//       }
//     });
//     return await docClient.send(command);
//   } catch (error) {
//     console.error("Update marks error:", error);
//     throw error;
//   }
// }

// export async function deleteMarks(studentId, subject) {
//   try {
//     const command = new DeleteCommand({
//       TableName: MARKS_TABLE,
//       Key: {
//         studentId: studentId,
//         subject: subject
//       }
//     });
//     return await docClient.send(command);
//   } catch (error) {
//     console.error("Delete marks error:", error);
//     throw error;
//   }
// }

// // ============ FILE UPLOAD API ============

// export async function uploadFile(file, studentId, fileType) {
//   try {
//     const key = `${studentId}/${fileType}/${Date.now()}_${file.name}`;
//     const command = new PutObjectCommand({
//       Bucket: BUCKET_NAME,
//       Key: key,
//       Body: file,
//       ContentType: file.type
//     });
    
//     await s3Client.send(command);
//     return `https://${BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${key}`;
//   } catch (error) {
//     console.error("File upload error:", error);
//     throw error;
//   }
// }



import { docClient, STUDENTS_TABLE, ATTENDANCE_TABLE, MARKS_TABLE, s3Client, BUCKET_NAME } from './aws-config';
import { PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// ============ STUDENT APIS ============

export async function registerStudent(studentData) {
  try {
    const command = new PutCommand({
      TableName: STUDENTS_TABLE,
      Item: {
        studentId: `STU_${Date.now()}`,
        ...studentData,
        createdAt: new Date().toISOString(),
        status: 'active'
      }
    });
    return await docClient.send(command);
  } catch (error) {
    console.error("Student registration error:", error);
    throw error;
  }
}

export async function getAllStudents() {
  try {
    const command = new ScanCommand({
      TableName: STUDENTS_TABLE
    });
    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function getStudentById(studentId) {
  try {
    const command = new GetCommand({
      TableName: STUDENTS_TABLE,
      Key: { studentId }
    });
    const response = await docClient.send(command);
    return response.Item;
  } catch (error) {
    console.error("Error fetching student:", error);
    return null;
  }
}

// ============ ATTENDANCE APIS ============

export async function markAttendance(attendanceData) {
  try {
    const command = new PutCommand({
      TableName: ATTENDANCE_TABLE,
      Item: {
        studentId: attendanceData.studentId,
        date: attendanceData.date,
        status: attendanceData.status,
        markedAt: new Date().toISOString()
      }
    });
    return await docClient.send(command);
  } catch (error) {
    console.error("Mark attendance error:", error);
    throw error;
  }
}

export async function getStudentAttendance(studentId) {
  try {
    const command = new QueryCommand({
      TableName: ATTENDANCE_TABLE,
      KeyConditionExpression: "studentId = :studentId",
      ExpressionAttributeValues: {
        ":studentId": studentId
      }
    });
    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }
}

export async function getAttendanceByDate(date) {
  try {
    const command = new ScanCommand({
      TableName: ATTENDANCE_TABLE,
      FilterExpression: "date = :date",
      ExpressionAttributeValues: {
        ":date": date
      }
    });
    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error("Error fetching attendance by date:", error);
    return [];
  }
}

// ============ MARKS APIS ============

export async function addMarks(marksData) {
  try {
    const percentage = (marksData.marks / marksData.totalMarks) * 100;
    const command = new PutCommand({
      TableName: MARKS_TABLE,
      Item: {
        studentId: marksData.studentId,
        subject: marksData.subject,
        marks: marksData.marks,
        totalMarks: marksData.totalMarks,
        percentage: percentage,
        updatedAt: new Date().toISOString()
      }
    });
    return await docClient.send(command);
  } catch (error) {
    console.error("Add marks error:", error);
    throw error;
  }
}

export async function getStudentMarks(studentId) {
  try {
    const command = new QueryCommand({
      TableName: MARKS_TABLE,
      KeyConditionExpression: "studentId = :studentId",
      ExpressionAttributeValues: {
        ":studentId": studentId
      }
    });
    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error("Error fetching marks:", error);
    return [];
  }
}

export async function updateMarks(studentId, subject, marks, totalMarks) {
  try {
    const percentage = (marks / totalMarks) * 100;
    const command = new UpdateCommand({
      TableName: MARKS_TABLE,
      Key: { 
        studentId: studentId,
        subject: subject
      },
      UpdateExpression: "set marks = :marks, totalMarks = :totalMarks, percentage = :percentage, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":marks": marks,
        ":totalMarks": totalMarks,
        ":percentage": percentage,
        ":updatedAt": new Date().toISOString()
      }
    });
    return await docClient.send(command);
  } catch (error) {
    console.error("Update marks error:", error);
    throw error;
  }
}

export async function deleteMarks(studentId, subject) {
  try {
    const command = new DeleteCommand({
      TableName: MARKS_TABLE,
      Key: {
        studentId: studentId,
        subject: subject
      }
    });
    return await docClient.send(command);
  } catch (error) {
    console.error("Delete marks error:", error);
    throw error;
  }
}

// ============ SIMPLE FILE UPLOAD (No AWS SDK - Direct Fetch) ============

export async function uploadFile(file, studentId, fileType) {
  try {
    const REGION = import.meta.env.VITE_AWS_REGION;
    const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
    
    const key = `${studentId}/${fileType}/${Date.now()}_${file.name}`;
    const uploadUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
    
    console.log("Uploading to:", uploadUrl);
    console.log("File size:", file.size, "bytes");
    console.log("File type:", file.type);
    
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
    
    console.log("Upload success!");
    return uploadUrl;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
}