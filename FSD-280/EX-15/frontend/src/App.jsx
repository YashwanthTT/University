import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import TypstEditor from './pages/TypstEditor';
import FilesPage from './pages/FilesPage';
import './styles.css';

const authed = () => !!localStorage.getItem('token');

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/editor" />} />
        <Route path="/editor" element={<TypstEditor />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add" element={authed() ? <AddStudent /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
