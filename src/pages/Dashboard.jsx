import { useState, useEffect } from 'react';
import { getAllStudents, getStudentAttendance, getStudentMarks } from '../services/api';
import UploadStatus from '../components/UploadStatus';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getAllStudents();
    setStudents(data || []);
  };

  const loadStudentDetails = async (studentId) => {
    const attendanceData = await getStudentAttendance(studentId);
    const marksData = await getStudentMarks(studentId);
    setAttendance(attendanceData || []);
    setMarks(marksData || []);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    loadStudentDetails(student.studentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Students List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Students List</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map(student => (
              <div
                key={student.studentId}
                onClick={() => handleStudentSelect(student)}
                className="p-3 border rounded cursor-pointer hover:bg-blue-50 transition"
              >
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-600">Roll: {student.rollNo} | Course: {student.course}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <div className="mb-4">
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Roll No:</strong> {selectedStudent.rollNo}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Course:</strong> {selectedStudent.course}</p>
              <p><strong>Semester:</strong> {selectedStudent.semester}</p>
            </div>

            <UploadStatus studentId={selectedStudent.studentId} onUploadComplete={(url) => {
              console.log('File uploaded:', url);
            }} />

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Attendance</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {attendance.map((record, i) => (
                  <p key={i} className="text-sm">{record.date}: {record.status}</p>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Marks</h3>
              <div className="space-y-1">
                {marks.map((mark, i) => (
                  <p key={i} className="text-sm">{mark.subject}: {mark.marks}/{mark.totalMarks} ({mark.percentage}%)</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// {selectedStudent && (
//   <div className="bg-white rounded-xl shadow-lg p-6">
//     <div className="flex items-center justify-between mb-6">
//       <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
//       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//         Active
//       </span>
//     </div>
    
//     <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
//       <div>
//         <p className="text-sm text-gray-500">Full Name</p>
//         <p className="font-semibold text-gray-800">{selectedStudent.name}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Roll Number</p>
//         <p className="font-semibold text-gray-800">{selectedStudent.rollNo}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Email</p>
//         <p className="font-semibold text-gray-800">{selectedStudent.email}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Course</p>
//         <p className="font-semibold text-gray-800">{selectedStudent.course} - Sem {selectedStudent.semester}</p>
//       </div>
//     </div>

//     <UploadStatus 
//       studentId={selectedStudent.studentId} 
//       onUploadComplete={(url) => {
//         console.log('File uploaded:', url);
//         alert('✅ File uploaded successfully!');
//       }} 
//     />
//   </div>
// )}
// export default Dashboard;