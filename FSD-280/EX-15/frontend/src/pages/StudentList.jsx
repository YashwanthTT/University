import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    api.get('/students').then((r) => setStudents(r.data)).catch(() => setStudents([]));
  }, []);
  const del = async (id) => {
    await api.delete(`/students/${id}`);
    setStudents(students.filter((s) => s._id !== id));
  };
  return (
    <div>
      <h2>Students</h2>
      <Link to="/add">Add Student</Link>
      <ul>
        {students.map((s) => (
          <li key={s._id}>{s.name} ({s.dept}) - {s.marks} <button onClick={() => del(s._id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}
