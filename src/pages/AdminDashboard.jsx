// import { useState, useEffect } from 'react';
// import { getAllStudents, getStudentAttendance, getStudentMarks } from '../services/api';
// import UploadStatus from '../components/UploadStatus';

// function AdminDashboard() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [attendance, setAttendance] = useState([]);
//   const [marks, setMarks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   const loadStudents = async () => {
//     const data = await getAllStudents();
//     setStudents(data || []);
//     setLoading(false);
//   };

//   const loadStudentDetails = async (studentId) => {
//     const attendanceData = await getStudentAttendance(studentId);
//     const marksData = await getStudentMarks(studentId);
//     setAttendance(attendanceData || []);
//     setMarks(marksData || []);
//   };

//   const handleStudentSelect = (student) => {
//     setSelectedStudent(student);
//     loadStudentDetails(student.studentId);
//   };

//   const calculateAttendancePercentage = () => {
//     if (attendance.length === 0) return 0;
//     const present = attendance.filter(a => a.status === 'present').length;
//     return ((present / attendance.length) * 100).toFixed(1);
//   };

//   const calculateMarksPercentage = () => {
//     if (marks.length === 0) return 0;
//     let totalObtained = 0;
//     let totalMax = 0;
//     marks.forEach(m => {
//       totalObtained += m.marks;
//       totalMax += m.totalMarks;
//     });
//     return ((totalObtained / totalMax) * 100).toFixed(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Admin Dashboard</h1>
//           <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
//             Teacher Access
//           </div>
//         </div>
        
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Students List */}
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//               <h2 className="text-xl font-semibold text-white">👥 Students List</h2>
//               <p className="text-blue-100 text-sm mt-1">Select a student to manage</p>
//             </div>
            
//             <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
//               {loading ? (
//                 <div className="p-8 text-center text-gray-500">Loading students...</div>
//               ) : students.length === 0 ? (
//                 <div className="p-8 text-center text-gray-500">No students found.</div>
//               ) : (
//                 students.map(student => (
//                   <div
//                     key={student.studentId}
//                     onClick={() => handleStudentSelect(student)}
//                     className={`p-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
//                       selectedStudent?.studentId === student.studentId ? 'bg-blue-50 border-l-4 border-blue-600' : ''
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-semibold text-gray-800">{student.name}</p>
//                         <p className="text-sm text-gray-500">Roll: {student.rollNo}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium text-gray-600">{student.course}</p>
//                         <p className="text-xs text-gray-400">Sem {student.semester}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Student Details with Admin Controls */}
//           {selectedStudent ? (
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
//                 <h2 className="text-xl font-semibold text-white">📋 Student Details</h2>
//                 <p className="text-green-100 text-sm mt-1">Manage documents and view information</p>
//               </div>
              
//               <div className="p-6">
//                 {/* Student Info */}
//                 <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase">Full Name</p>
//                       <p className="font-semibold text-gray-800">{selectedStudent.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase">Roll Number</p>
//                       <p className="font-semibold text-gray-800">{selectedStudent.rollNo}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase">Email</p>
//                       <p className="font-semibold text-gray-800">{selectedStudent.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase">Course</p>
//                       <p className="font-semibold text-gray-800">{selectedStudent.course} - Sem {selectedStudent.semester}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-blue-50 rounded-lg p-3 text-center">
//                     <p className="text-2xl font-bold text-blue-600">{calculateAttendancePercentage()}%</p>
//                     <p className="text-xs text-gray-600">Attendance</p>
//                   </div>
//                   <div className="bg-green-50 rounded-lg p-3 text-center">
//                     <p className="text-2xl font-bold text-green-600">{calculateMarksPercentage()}%</p>
//                     <p className="text-xs text-gray-600">Marks Average</p>
//                   </div>
//                 </div>

//                 {/* Upload Component - Only for Admin */}
//                 <UploadStatus 
//                   studentId={selectedStudent.studentId} 
//                   onUploadComplete={(url) => {
//                     console.log('File uploaded:', url);
//                     alert('✅ Document uploaded successfully!');
//                   }} 
//                 />
                
//                 <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
//                   ⚠️ Note: Attendance and marks can be managed from the Attendance and Marks pages.
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//               <div className="text-6xl mb-4">👈</div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No Student Selected</h3>
//               <p className="text-gray-500">Select a student from the list to view details and upload documents</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import { useState, useEffect } from 'react';
import { getAllStudents, getStudentAttendance, getStudentMarks } from '../services/api';
import UploadStatus from '../components/UploadStatus';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getAllStudents();
    // Only show students, hide admin
    const onlyStudents = data.filter(student => student.role !== 'admin');
    setStudents(onlyStudents || []);
    setLoading(false);
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

  const calculateAttendancePercentage = () => {
    if (attendance.length === 0) return 0;
    const present = attendance.filter(a => a.status === 'present').length;
    return ((present / attendance.length) * 100).toFixed(1);
  };

  const calculateMarksPercentage = () => {
    if (marks.length === 0) return 0;
    let totalObtained = 0;
    let totalMax = 0;
    marks.forEach(m => {
      totalObtained += m.marks;
      totalMax += m.totalMarks;
    });
    return ((totalObtained / totalMax) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Admin Dashboard</h1>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
            Teacher Access
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Students List - Only Students */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">👥 Students List</h2>
              <p className="text-blue-100 text-sm mt-1">Select a student to manage</p>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading students...</div>
              ) : students.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No students found.</div>
              ) : (
                students.map(student => (
                  <div
                    key={student.studentId}
                    onClick={() => handleStudentSelect(student)}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                      selectedStudent?.studentId === student.studentId ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">Roll: {student.rollNo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">{student.course}</p>
                        <p className="text-xs text-gray-400">Sem {student.semester}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Student Details */}
          {selectedStudent ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">📋 Student Details</h2>
                <p className="text-green-100 text-sm mt-1">Manage documents and view information</p>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Full Name</p>
                      <p className="font-semibold text-gray-800">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Roll Number</p>
                      <p className="font-semibold text-gray-800">{selectedStudent.rollNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Email</p>
                      <p className="font-semibold text-gray-800">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Course</p>
                      <p className="font-semibold text-gray-800">{selectedStudent.course} - Sem {selectedStudent.semester}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{calculateAttendancePercentage()}%</p>
                    <p className="text-xs text-gray-600">Attendance</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{calculateMarksPercentage()}%</p>
                    <p className="text-xs text-gray-600">Marks Average</p>
                  </div>
                </div>

                <UploadStatus 
                  studentId={selectedStudent.studentId} 
                  onUploadComplete={(url) => {
                    console.log('File uploaded:', url);
                    alert('✅ Document uploaded successfully!');
                  }} 
                />
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
                  📌 Go to Attendance and Marks pages to manage student records.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">👈</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Student Selected</h3>
              <p className="text-gray-500">Select a student from the list to view details and upload documents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;