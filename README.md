# TaskOrbit

A production-quality **Trello-like Task Board** built with React. Features drag-and-drop task management, real-time search and filtering, activity logging, and full localStorage persistence — all without a backend.

---

## Features

- **Static Login** — Hardcoded credentials with Remember Me support
- **3-Column Board** — Todo · Doing · Done
- **Full CRUD** — Create, edit, and delete tasks with confirmation dialogs
- **Drag & Drop** — Move tasks across columns using @dnd-kit
- **Search** — Real-time search by title
- **Filter** — Filter tasks by priority (Low / Medium / High)
- **Sort** — Sort by due date ascending (empty dates last)
- **Activity Log** — Tracks all task operations with timestamps
- **Persistence** — All data stored in localStorage
- **Reset Board** — Clear all tasks and logs with confirmation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Vite) |
| Routing | react-router-dom v7 |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| State | Context API |
| Styling | Vanilla CSS (custom properties) |
| IDs | uuid |
| Testing | Vitest + React Testing Library |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone <repo-url>
cd TaskOrbit
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

### Login Credentials

| Field | Value |
|-------|-------|
| Email | `intern@demo.com` |
| Password | `intern123` |

### Run Tests

```bash
npm test
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── __tests__/          # Vitest test files
├── components/
│   ├── ActivityLog.jsx
│   ├── Column.jsx
│   ├── ConfirmDialog.jsx
│   ├── ProtectedRoute.jsx
│   ├── SearchFilterBar.jsx
│   ├── TaskCard.jsx
│   └── TaskModal.jsx
├── context/
│   ├── AuthContext.jsx
│   └── TaskContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Login.css
├── utils/
│   └── storage.js
├── App.jsx
├── index.css
├── main.jsx
└── setupTests.js
```

---

## Storage

All data persists in **localStorage** under these keys:

| Key | Purpose |
|-----|---------|
| `taskOrbit_session` | Login session (only if "Remember Me" is checked) |
| `taskOrbit_tasks` | Array of task objects |
| `taskOrbit_logs` | Array of activity log entries |

Without "Remember Me", the session is stored in `sessionStorage` and expires when the browser tab closes.

If localStorage data is corrupted or missing, the app initializes safely with empty defaults.

---

## License

MIT
