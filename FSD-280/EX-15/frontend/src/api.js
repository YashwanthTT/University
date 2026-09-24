import axios from 'axios';

// Point to deployed backend URL when set (Vercel env), else local dev server
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' });
api.interceptors.request.use((c) => {
  const t = localStorage.getItem('token');
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});
export default api;
