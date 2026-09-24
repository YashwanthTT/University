import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';

const authed = () => !!localStorage.getItem('token');

export default function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/students">Students</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link></nav>
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/students" element={authed() ? <StudentList /> : <Navigate to="/login" />} />
        <Route path="/add" element={authed() ? <AddStudent /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
