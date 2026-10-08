import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TypstEditor from './pages/TypstEditor';
import FilesPage from './pages/FilesPage';
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/editor" />} />
        <Route path="/editor" element={<TypstEditor />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="*" element={<Navigate to="/editor" />} />
      </Routes>
    </BrowserRouter>
  );
}
