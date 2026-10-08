# Typster: Typst editor with live preview

## Run locally

Backend: `npm install && npm start` in `backend/` (set `MONGO_URI` for document persistence).
Frontend: `npm install && npm run dev` in `frontend/` (Vite → http://localhost:5173).

## Deploy

Backend → Render: root `backend/`, start `npm start`, set `MONGO_URI` and `FRONTEND_URL`.
Frontend → Vercel: root `frontend/`, set `VITE_API_URL` to the deployed backend API URL.

## API

- `GET /api/health` — deployment health check
- `GET /api/autocomplete?q=%23set` — Typst completion suggestions
- `POST /api/compile` with `{ "source": "..." }` — bracket diagnostics
- `GET /api/documents` — list saved documents
- `PUT /api/documents/:name` with `{ "source": "..." }` — save a document
- `DELETE /api/documents/:name` — delete a document
