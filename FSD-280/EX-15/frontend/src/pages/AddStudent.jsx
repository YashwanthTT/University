import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddStudent() {
  const [form, setForm] = useState({ student_id: '', name: '', dept: 'CSE', marks: '' });
  const nav = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    await api.post('/students', form);
    nav('/students');
  };
  return (
    <form onSubmit={submit}>
      <h2>Add Student</h2>
      <input placeholder="ID" value={form.student_id} onChange={set('student_id')} required />
      <input placeholder="Name" value={form.name} onChange={set('name')} required />
      <input placeholder="Dept" value={form.dept} onChange={set('dept')} />
      <input placeholder="Marks" type="number" value={form.marks} onChange={set('marks')} />
      <button>Add</button>
    </form>
  );
}
