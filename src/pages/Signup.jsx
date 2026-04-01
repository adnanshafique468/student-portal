// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { registerStudent } from '../services/api';

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     rollNo: '',
//     course: '',
//     semester: '',
//     phone: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await registerStudent(formData);
//       alert('Registration successful! Please login.');
//       navigate('/login');
//     } catch (error) {
//       alert('Registration failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Student Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Roll Number"
//               value={formData.rollNo}
//               onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <select
//               value={formData.course}
//               onChange={(e) => setFormData({...formData, course: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Course</option>
//               <option value="BCA">BCA</option>
//               <option value="MCA">MCA</option>
//               <option value="B.Tech">B.Tech</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <input
//               type="number"
//               placeholder="Semester"
//               value={formData.semester}
//               onChange={(e) => setFormData({...formData, semester: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={(e) => setFormData({...formData, phone: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
//           >
//             {loading ? 'Registering...' : 'Sign Up'}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerStudent } from '../services/api';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',        // NEW: Password field
    rollNo: '',
    course: '',
    semester: '',
    phone: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    
    setLoading(true);
    try {
      await registerStudent({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        rollNo: formData.rollNo,
        course: formData.course,
        semester: formData.semester,
        phone: formData.phone,
        role: 'student'
      });
      alert('✅ Registration successful! Please login.');
      window.location.href = '/#/login';
    } catch (error) {
      alert('❌ Registration failed! Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password (min 4 characters)"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength="4"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <select
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Course</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="B.Tech">B.Tech</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Semester"
              value={formData.semester}
              onChange={(e) => setFormData({...formData, semester: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;