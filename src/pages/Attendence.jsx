import { useState, useEffect } from 'react';
import { getAllStudents, markAttendance, getAttendanceByDate } from '../services/api';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [existingData, setExistingData] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      checkExistingAttendance();
    }
  }, [selectedDate, students]);

  const loadStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);
    const initial = {};
    data.forEach(s => { initial[s.studentId] = 'present'; });
    setAttendance(initial);
  };

  const checkExistingAttendance = async () => {
    const existing = await getAttendanceByDate(selectedDate);
    if (existing.length > 0) {
      setExistingData(true);
      const newAttendance = {};
      existing.forEach(record => {
        newAttendance[record.studentId] = record.status;
      });
      students.forEach(student => {
        if (!newAttendance[student.studentId]) {
          newAttendance[student.studentId] = 'present';
        }
      });
      setAttendance(newAttendance);
    } else {
      setExistingData(false);
      const initial = {};
      students.forEach(s => { initial[s.studentId] = 'present'; });
      setAttendance(initial);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
    setSaved(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const studentId of Object.keys(attendance)) {
        await markAttendance({
          studentId,
          date: selectedDate,
          status: attendance[studentId]
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('Error saving attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'late': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📋 Mark Attendance</h1>
          {saved && (
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">
              ✅ Attendance Saved Successfully!
            </div>
          )}
          {existingData && !saved && (
            <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow">
              ⚠️ Attendance already exists for this date. Editing...
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Roll No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Semester</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.studentId} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm">{student.rollNo}</td>
                    <td className="px-6 py-3 text-sm font-medium">{student.name}</td>
                    <td className="px-6 py-3 text-sm">{student.course}</td>
                    <td className="px-6 py-3 text-sm">{student.semester}</td>
                    <td className="px-6 py-3">
                      <select
                        value={attendance[student.studentId]}
                        onChange={(e) => handleStatusChange(student.studentId, e.target.value)}
                        className={`border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(attendance[student.studentId])}`}
                      >
                        <option value="present">✅ Present</option>
                        <option value="absent">❌ Absent</option>
                        <option value="late">⏰ Late</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold"
            >
              {loading ? 'Saving...' : '💾 Save Attendance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;