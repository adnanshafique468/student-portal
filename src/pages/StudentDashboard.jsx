import { useState, useEffect } from 'react';
import { getStudentById, getStudentAttendance, getStudentMarks } from '../services/api';

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      const studentData = await getStudentById(user.id);
      setStudent(studentData);
      
      const attendanceData = await getStudentAttendance(user.id);
      setAttendance(attendanceData);
      
      const marksData = await getStudentMarks(user.id);
      setMarks(marksData);
    }
    setLoading(false);
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

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const attendancePercent = calculateAttendancePercentage();
  const marksPercent = calculateMarksPercentage();
  const gradeInfo = getGrade(marksPercent);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Dashboard</h1>
        
        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">👤 My Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{student?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Roll No</p>
              <p className="font-semibold">{student?.rollNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Course</p>
              <p className="font-semibold">{student?.course} - Sem {student?.semester}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{student?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">📋 Attendance</h3>
            <p className="text-3xl font-bold text-blue-600">{attendancePercent}%</p>
            <p className="text-sm text-gray-600 mt-2">
              Present: {attendance.filter(a => a.status === 'present').length} / {attendance.length} days
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">📝 Marks</h3>
            <p className={`text-3xl font-bold ${gradeInfo.color}`}>{marksPercent}%</p>
            <p className={`text-sm font-semibold ${gradeInfo.color} mt-2`}>
              Grade: {gradeInfo.grade}
            </p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📋 My Attendance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center py-4 text-gray-500">No attendance records found</td>
                  </tr>
                ) : (
                  attendance.map((record, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">{record.date}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          record.status === 'present' ? 'bg-green-100 text-green-700' :
                          record.status === 'absent' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status === 'present' ? '✅ Present' : 
                           record.status === 'absent' ? '❌ Absent' : '⏰ Late'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marks Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">📊 My Marks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Marks</th>
                  <th className="px-4 py-2 text-left">Percentage</th>
                  <th className="px-4 py-2 text-left">Grade</th>
                </tr>
              </thead>
              <tbody>
                {marks.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">No marks records found</td>
                  </tr>
                ) : (
                  marks.map((mark, i) => {
                    const grade = getGrade(mark.percentage);
                    return (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2">{mark.subject}</td>
                        <td className="px-4 py-2">{mark.marks}/{mark.totalMarks}</td>
                        <td className="px-4 py-2">{mark.percentage.toFixed(1)}%</td>
                        <td className={`px-4 py-2 font-bold ${grade.color}`}>{grade.grade}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;