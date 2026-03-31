// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute';
// import Home from './pages/Home';
// import Login from './pages/login';
// import Signup from './pages/signup';
// import Dashboard from './pages/Dashboard';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendence';
import Marks from './pages/Marks';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/attendance" element={
          <PrivateRoute>
            <Attendance />
          </PrivateRoute>
        } />
        <Route path="/marks" element={
          <PrivateRoute>
            <Marks />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;