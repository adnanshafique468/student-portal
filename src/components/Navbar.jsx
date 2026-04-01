// import { Link, useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem('user');

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-600 text-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link to="/" className="text-2xl font-bold">
//             Student Portal
//           </Link>
          
//           <div className="space-x-4">
//             <Link to="/" className="hover:text-gray-200 transition">Home</Link>
//             {isLoggedIn ? (
//               <>
//                 <Link to="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>
//                 <button onClick={handleLogout} className="hover:text-gray-200 transition">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
//                 <Link to="/signup" className="hover:text-gray-200 transition">Signup</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import { Link, useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem('user');

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link to="/" className="text-2xl font-bold flex items-center gap-2">
//             🎓 Student Portal
//           </Link>
          
//           <div className="flex space-x-6">
//             <Link to="/" className="hover:text-gray-200 transition">🏠 Home</Link>
//             {isLoggedIn ? (
//               <>
//                 <Link to="/dashboard" className="hover:text-gray-200 transition">📊 Dashboard</Link>
//                 <Link to="/attendance" className="hover:text-gray-200 transition">📋 Attendance</Link>
//                 <Link to="/marks" className="hover:text-gray-200 transition">📝 Marks</Link>
//                 <button onClick={handleLogout} className="hover:text-gray-200 transition">
//                   🚪 Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="hover:text-gray-200 transition">🔑 Login</Link>
//                 <Link to="/signup" className="hover:text-gray-200 transition">📝 Signup</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            🎓 Student Portal
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">🏠 Home</Link>
            
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin" className="hover:text-gray-200 transition">👨‍🏫 Admin</Link>
                    <Link to="/attendance" className="hover:text-gray-200 transition">📋 Attendance</Link>
                    <Link to="/marks" className="hover:text-gray-200 transition">📝 Marks</Link>
                  </>
                ) : (
                  <Link to="/dashboard" className="hover:text-gray-200 transition">📊 My Dashboard</Link>
                )}
                
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-blue-500 px-3 py-1 rounded-full">
                    {user.role === 'admin' ? '👨‍🏫 Admin' : '🎓 Student'}
                  </span>
                  <button onClick={handleLogout} className="hover:text-gray-200 transition">
                    🚪 Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200 transition">🔑 Login</Link>
                <Link to="/signup" className="hover:text-gray-200 transition">📝 Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;