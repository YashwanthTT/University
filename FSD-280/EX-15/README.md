# EX-15: MERN Full Stack Integration (Student Management)

## Run locally
Backend: `npm install && node app.js` in `backend/` (needs MongoDB on `MONGO_URI`; on macOS AirPlay uses port 5000, so use `PORT=5001 node app.js` if busy)
Frontend: `npm install && npm run dev` in `frontend/` (Vite → http://localhost:5173)
Flow: Register → Login (JWT saved to localStorage) → View Students → Add Student

## Deploy
Backend → Render: root `backend/`, start `node app.js`, set `MONGO_URI` (Atlas), `JWT_SECRET`, `FRONTEND_URL` (Vercel URL).
Frontend → Vercel: root `frontend/`, set `VITE_API_URL` to the Render backend URL.
