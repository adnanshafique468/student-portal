import { useState, useEffect } from 'react';
import { getAllStudents, addMarks, getStudentMarks, updateMarks, deleteMarks } from '../services/api';

function Marks() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [selectedStudentRoll, setSelectedStudentRoll] = useState('');
  const [formData, setFormData] = useState({ subject: '', marks: '', totalMarks: '' });
  const [marksList, setMarksList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      loadMarks();
    }
  }, [selectedStudent]);

  const loadStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);
  };

  const loadMarks = async () => {
    const data = await getStudentMarks(selectedStudent);
    setMarksList(data);
  };

  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    const student = students.find(s => s.studentId === studentId);
    setSelectedStudentName(student?.name || '');
    setSelectedStudentRoll(student?.rollNo || '');
    setEditingSubject(null);
    setFormData({ subject: '', marks: '', totalMarks: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('Please select a student first');
      return;
    }
    
    setLoading(true);
    try {
      if (editingSubject) {
        await updateMarks(selectedStudent, editingSubject, parseInt(formData.marks), parseInt(formData.totalMarks));
        alert('Marks updated successfully!');
      } else {
        await addMarks({
          studentId: selectedStudent,
          subject: formData.subject,
          marks: parseInt(formData.marks),
          totalMarks: parseInt(formData.totalMarks)
        });
        alert('Marks added successfully!');
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ subject: '', marks: '', totalMarks: '' });
      setEditingSubject(null);
      loadMarks();
    } catch (error) {
      alert('Error saving marks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mark) => {
    setEditingSubject(mark.subject);
    setFormData({
      subject: mark.subject,
      marks: mark.marks,
      totalMarks: mark.totalMarks
    });
  };

  const handleDelete = async (subject) => {
    if (window.confirm(`Are you sure you want to delete ${subject} marks?`)) {
      try {
        await deleteMarks(selectedStudent, subject);
        alert('Marks deleted successfully!');
        loadMarks();
      } catch (error) {
        alert('Error deleting marks');
      }
    }
  };

  const calculateTotal = () => {
    let totalObtained = 0;
    let totalMax = 0;
    marksList.forEach(m => {
      totalObtained += m.marks;
      totalMax += m.totalMarks;
    });
    const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
    return { totalObtained, totalMax, percentage };
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500', bg: 'bg-green-50' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const total = calculateTotal();
  const gradeInfo = getGrade(total.percentage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📝 Marks Management</h1>
          {success && (
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">
              ✅ Marks Saved Successfully!
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add/Edit Marks Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingSubject ? '✏️ Edit Marks' : '➕ Add New Marks'}</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Select Student</label>
              <select
                value={selectedStudent}
                onChange={handleStudentSelect}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Student --</option>
                {students.map(s => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.name} ({s.rollNo}) - {s.course} Sem {s.semester}
                  </option>
                ))}
              </select>
            </div>

            {selectedStudent && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-semibold">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={editingSubject !== null}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">Obtained Marks</label>
                    <input
                      type="number"
                      placeholder="e.g., 85"
                      value={formData.marks}
                      onChange={(e) => setFormData({...formData, marks: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="0"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">Total Marks</label>
                    <input
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.totalMarks}
                      onChange={(e) => setFormData({...formData, totalMarks: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold"
                  >
                    {loading ? 'Saving...' : editingSubject ? '✏️ Update Marks' : '➕ Add Marks'}
                  </button>
                  {editingSubject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSubject(null);
                        setFormData({ subject: '', marks: '', totalMarks: '' });
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Marks Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">📊 Marks Card</h2>
            
            {selectedStudent ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-lg">{selectedStudentName}</h3>
                  <p className="text-gray-600">Roll No: {selectedStudentRoll} | ID: {selectedStudent}</p>
                </div>

                {marksList.length > 0 ? (
                  <>
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-sm">Subject</th>
                            <th className="px-3 py-2 text-left text-sm">Marks</th>
                            <th className="px-3 py-2 text-left text-sm">%</th>
                            <th className="px-3 py-2 text-left text-sm">Grade</th>
                            <th className="px-3 py-2 text-center text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marksList.map((mark, i) => {
                            const grade = getGrade(mark.percentage);
                            return (
                              <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="px-3 py-2 text-sm font-medium">{mark.subject}</td>
                                <td className="px-3 py-2 text-sm">{mark.marks}/{mark.totalMarks}</td>
                                <td className="px-3 py-2 text-sm">{mark.percentage.toFixed(1)}%</td>
                                <td className={`px-3 py-2 text-sm font-bold ${grade.color}`}>{grade.grade}</td>
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => handleEdit(mark)}
                                    className="text-blue-600 hover:text-blue-800 mr-2 text-sm"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDelete(mark.subject)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className={`rounded-lg p-4 ${gradeInfo.bg}`}>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600 text-sm">Total Obtained</p>
                          <p className="text-2xl font-bold">{total.totalObtained}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Total Maximum</p>
                          <p className="text-2xl font-bold">{total.totalMax}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Overall Percentage</p>
                          <p className="text-2xl font-bold">{total.percentage.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Final Grade</p>
                          <p className={`text-2xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No marks added yet. Add marks using the form.
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a student to view marks card
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks;