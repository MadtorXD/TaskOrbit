<div align="center">
  
# 🚀 TaskOrbit
### A Production-Quality Trello-like Task Board
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tests](https://img.shields.io/badge/Tests-12%20Passing-22c55e?style=for-the-badge)](/)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

A feature-rich **Trello-like Task Board** built with React. Features drag-and-drop task management, real-time search with dropdown results, activity logging, and full localStorage persistence — all without a backend.

**[Live Demo](#deployment) · [Getting Started](#getting-started) · [Features](#features) · [Architecture](#architecture)**
</div>

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Login Credentials](#login-credentials)
  - [Run Tests](#run-tests)
  - [Production Build](#production-build)
- [Application Flow](#-application-flow)
  - [Authentication](#1-authentication)
  - [Task Board](#2-task-board)
  - [Task CRUD](#3-task-crud)
  - [Drag & Drop](#4-drag--drop)
  - [Search, Filter & Sort](#5-search-filter--sort)
  - [Activity Log](#6-activity-log)
- [Architecture](#-architecture)
  - [Project Structure](#project-structure)
  - [State Management](#state-management)
  - [Component Hierarchy](#component-hierarchy)
- [Data Model](#-data-model)
- [Storage](#-storage)
- [Reliability & Error Handling](#-reliability--error-handling)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)


---

## ✨ Features
| Feature | Description |
|---------|-------------|
| **Static Login** | Hardcoded credentials with Remember Me support via localStorage/sessionStorage |
| **3-Column Board** | Todo · Doing · Done — each with a unique vibrant color identity |
| **Full CRUD** | Create, edit, and delete tasks with modal forms and confirmation dialogs |
| **Drag & Drop** | Move tasks across columns using @dnd-kit with visual feedback |
| **Search with Dropdown** | Real-time search by title with a dropdown showing matching tasks, status dots, and priority badges |
| **Filter by Priority** | Filter tasks by Low / Medium / High priority |
| **Sort by Due Date** | Sort ascending with tasks missing due dates placed last |
| **Activity Log** | Toggleable sidebar panel tracking every task operation with timestamps |
| **Persistence** | All data (tasks, logs, session) stored in localStorage — survives page refresh |
| **Reset Board** | Clear all tasks and activity logs with a confirmation dialog |
| **Protected Routes** | Users cannot access the board without logging in |
| **Responsive Design** | Desktop-first layout that adapts to smaller screens |

---

## 🛠 Tech Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | Functional components + Hooks |
| **Build Tool** | Vite 7 | Lightning-fast HMR and bundling |
| **Routing** | react-router-dom v7 | Client-side routing with protected routes |
| **Drag & Drop** | @dnd-kit/core + @dnd-kit/sortable | Accessible, performant drag-and-drop |
| **State** | Context API | Centralized state without external libraries |
| **Styling** | Vanilla CSS | Custom properties, gradients, glow effects |
| **IDs** | uuid | Unique task and log identifiers |
| **Testing** | Vitest + React Testing Library | Unit and integration tests |
### Why These Choices?
- **No Redux** — Context API is sufficient for this app's complexity; avoids unnecessary boilerplate.
- **@dnd-kit over react-beautiful-dnd** — Actively maintained, modular, better accessibility support, and smaller bundle.
- **Vanilla CSS over Tailwind** — Full control over the vibrant Gen-Z aesthetic with custom properties, gradients, and glow effects that would be verbose in utility classes.
- **Vitest over Jest** — Native Vite integration, faster execution, same API.
  
---

## 🚀 Getting Started
### Prerequisites
- **Node.js** 18 or higher
- **npm** 9 or higher
- A modern browser (Chrome, Firefox, Edge, Safari)
### Installation
```bash
# Clone the repository
git clone https://github.com/MadtorXD/TaskOrbit.git
# Navigate into the project directory
cd TaskOrbit
# Install dependencies
npm install
```
### Development
```bash
npm run dev
```
The development server starts at **[http://localhost:5173](http://localhost:5173)** with hot module replacement (HMR) enabled. Any changes to source files will instantly reflect in the browser.
### Login Credentials
| Field | Value |
|-------|-------|
| **Email** | `intern@demo.com` |
| **Password** | `intern123` |
> **Note:** These are hardcoded static credentials. There is no backend authentication — the login is simulated entirely on the client side.
### Run Tests
```bash
# Run all tests once
npm test
# Run tests in watch mode (re-runs on file changes)
npm run test:watch
```
### Production Build
```bash
# Build optimized production bundle
npm run build
# Preview the production build locally
npm run preview
```
The build output is generated in the `dist/` directory, ready for deployment to any static hosting service.

---

## 📱 Application Flow
### 1. Authentication
The app starts on the **Login Page** (`/`).
- Users enter their **email** and **password**
- A **"Remember Me"** checkbox controls session persistence:
  - ✅ **Checked** → Session is stored in `localStorage` and persists across browser restarts
  - ❌ **Unchecked** → Session is stored in `sessionStorage` and expires when the tab closes
- **Invalid credentials** display an inline error message
- **Empty fields** show a validation error prompting the user to fill both
- **Successful login** redirects to the Task Board (`/board`)
- A **Logout** button in the header clears the session and redirects back to login
- **Route protection** — Navigating to `/board` without authentication redirects to `/`
### 2. Task Board
The main dashboard (`/board`) displays a **3-column Kanban board**:
| Column | Color | Purpose |
|--------|-------|---------|
| **📋 Todo** | Hot Pink (`#f472b6`) | Tasks not yet started |
| **🔨 Doing** | Electric Yellow (`#facc15`) | Tasks currently in progress |
| **✅ Done** | Mint Green (`#34d399`) | Completed tasks |

Each column has:
- A **color-coded header** with task count badge
- An **"+ Add Task"** button for creating tasks in that column
- A **scrollable body** containing task cards
- **Visual feedback** when a card is dragged over the column (glowing border)
### 3. Task CRUD
#### Create Task
- Click **"+ Add Task"** in any column
- A **modal form** appears with fields:
  - **Title** (required — validated before submission)
  - **Description** (optional — multi-line textarea)
  - **Priority** (Low / Medium / High — dropdown selector)
  - **Due Date** (optional — date picker)
  - **Tags** (optional — comma-separated text input)
- Tasks are assigned a **unique ID** (`uuid`) and a **creation timestamp**
#### Edit Task
- Click the **✏️ pencil icon** on any task card
- The same modal opens pre-filled with the task's current data
- All fields can be modified
- Changes are **saved to localStorage** immediately
#### Delete Task
- Click the **🗑️ trash icon** on any task card
- A **confirmation dialog** appears: *"Delete [task name]? This cannot be undone."*
- On confirm, the task is removed from state and localStorage
### 4. Drag & Drop
- **Drag** any task card by clicking and holding
- **Drop** onto a different column to change the task's status
- The task's `status` field is automatically updated to match the destination column
- A **drag overlay** shows a preview of the card being moved
- Columns display a **glow effect** when a card is hovering over them
- All moves are **logged** in the Activity Log
**Technical details:**
- Uses `@dnd-kit/core` for the DnD context and collision detection
- `@dnd-kit/sortable` provides sortable card behavior within columns
- `PointerSensor` with a 5px activation distance prevents accidental drags
- `closestCorners` collision detection for accurate drop targeting
### 5. Search, Filter & Sort
The **toolbar** below the header provides three controls:
#### 🔍 Search
- **Real-time filtering** as you type — the board updates instantly
- A **dropdown** appears below the search box showing matching tasks with:
  - **Color-coded status dot** (pink/yellow/green)
  - **Task title**
  - **Priority badge**
- Click a dropdown result to filter to that specific task
- **Clear button** (✕) resets the search
- **Arrow button** (→) provides a clickable alternative to pressing Enter
#### 🎯 Priority Filter
- Dropdown with options: All Priorities, Low, Medium, High
- Filters the entire board — only cards matching the selected priority are shown
#### 📅 Sort by Due Date
- Toggle button that sorts tasks **ascending** by due date
- Tasks **without a due date** are automatically placed **last**
- Active state shows a purple glow indicator
### 6. Activity Log
- Toggle the log sidebar using the **📝 Log** button in the header
- Slides in from the right with a smooth 300ms transition
- Displays the **last 50 actions** in reverse chronological order
**Events tracked:**
| Event | Example Log Entry |
|-------|-------------------|
| Task Created | `Created task "Design Landing Page"` |
| Task Edited | `Edited task "Design Landing Page"` |
| Task Moved | `Moved "Design Landing Page" to Done` |
| Task Deleted | `Deleted task "Design Landing Page"` |
Each log entry shows the **action text** and a **formatted timestamp** (e.g., `Feb 18, 08:30 PM`).

---

## 🏗 Architecture
### Project Structure
```
TaskOrbit/
├── public/
│   └── vite.svg                  # Default favicon
├── src/
│   ├── __tests__/                # Test files
│   │   ├── Login.test.jsx        # Login validation tests (3 tests)
│   │   ├── TaskCard.test.jsx     # Card rendering tests (4 tests)
│   │   └── TaskContext.test.jsx  # CRUD + state tests (5 tests)
│   ├── components/               # Reusable UI components
│   │   ├── ActivityLog.jsx       # Sidebar log panel
│   │   ├── Column.jsx            # Droppable column container
│   │   ├── ConfirmDialog.jsx     # Reusable confirmation modal
│   │   ├── ProtectedRoute.jsx    # Auth route guard
│   │   ├── SearchFilterBar.jsx   # Search/filter/sort toolbar
│   │   ├── TaskCard.jsx          # Draggable task card
│   │   └── TaskModal.jsx         # Create/edit task form modal
│   ├── context/                  # State management
│   │   ├── AuthContext.jsx       # Authentication state + login/logout
│   │   └── TaskContext.jsx       # Task CRUD + filtering + activity log
│   ├── pages/                    # Route-level components
│   │   ├── Dashboard.jsx         # Main board page (DnD context)
│   │   ├── Login.jsx             # Login form page
│   │   └── Login.css             # Login-specific styles
│   ├── utils/                    # Helper utilities
│   │   └── storage.js            # Safe localStorage/sessionStorage API
│   ├── App.jsx                   # Router + provider setup
│   ├── index.css                 # Global styles (vibrant Gen-Z theme)
│   ├── main.jsx                  # React DOM entry point
│   └── setupTests.js             # Vitest setup (jest-dom matchers)
├── .gitignore
├── index.html                    # HTML entry point
├── package.json                  # Dependencies + scripts
├── vite.config.js                # Vite + Vitest configuration
└── README.md                     # This file
```
### State Management
The app uses **React Context API** with two independent contexts to avoid prop drilling:
```
App
├── AuthProvider (AuthContext)
│   ├── isAuthenticated, session
│   ├── login(email, password, rememberMe)
│   └── logout()
│
└── TaskProvider (TaskContext)
    ├── tasks[], logs[]
    ├── searchTerm, priorityFilter, sortByDueDate
    ├── addTask(), editTask(), deleteTask(), moveTask()
    ├── resetBoard()
    ├── getTasksByStatus(status) → filtered task list
    └── filteredTasks (derived via useMemo)
```
**Key design decisions:**
- **Filtering is centralized** — `filteredTasks` is a memoized derived value computed from `tasks`, `searchTerm`, `priorityFilter`, and `sortByDueDate`. Components never filter locally.
- **Persistence is automatic** — Every state mutation (`addTask`, `editTask`, `deleteTask`, `moveTask`) syncs to localStorage immediately.
- **Activity logging is built-in** — Each CRUD operation automatically appends to the activity log.
### Component Hierarchy
```
App (BrowserRouter)
├── Login Page (/)
│   └── Login form with email, password, remember me
│
└── Dashboard (/board) [ProtectedRoute]
    ├── Header (logo, log toggle, reset, logout)
    ├── SearchFilterBar (search box + dropdown, filter, sort)
    ├── DndContext
    │   ├── Column[Todo] → TaskCard[] (draggable)
    │   ├── Column[Doing] → TaskCard[] (draggable)
    │   ├── Column[Done] → TaskCard[] (draggable)
    │   └── DragOverlay
    ├── ActivityLog (sidebar)
    ├── TaskModal (create/edit — shared)
    └── ConfirmDialog (delete/reset — shared)
```

---

## 📦 Data Model
### Task Object
```javascript
{
  id: "550e8400-e29b-41d4-a716-446655440000",  // UUID v4
  title: "Design Landing Page",                  // Required, trimmed
  description: "Create the new homepage design", // Optional
  priority: "High",                              // "Low" | "Medium" | "High"
  dueDate: "2026-03-01",                         // Optional, ISO date string
  tags: "design, frontend",                      // Optional, comma-separated
  createdAt: "2026-02-18T15:08:25.000Z",         // Auto-generated ISO timestamp
  status: "Todo"                                 // "Todo" | "Doing" | "Done"
}
```
### Activity Log Entry
```javascript
{
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",      // UUID v4
  action: "Created task \"Design Landing Page\"",    // Human-readable action
  timestamp: "2026-02-18T15:08:25.000Z"              // ISO timestamp
}
```
### Session Object
```javascript
{
  email: "intern@demo.com",
  loggedInAt: "2026-02-18T15:08:25.000Z"
}
```
---

## 💾 Storage
All data persists in the browser's **localStorage** under namespaced keys:
| Key | Type | Purpose |
|-----|------|---------|
| `taskOrbit_session` | Object | Login session (only if "Remember Me" is checked) |
| `taskOrbit_tasks` | Array | All task objects |
| `taskOrbit_logs` | Array | Activity log entries (max 50) |
### Storage Behavior
| Scenario | Behavior |
|----------|----------|
| **Remember Me checked** | Session stored in `localStorage` → persists across browser restarts |
| **Remember Me unchecked** | Session stored in `sessionStorage` → expires when tab closes |
| **localStorage empty** | App initializes with empty arrays `[]` |
| **localStorage corrupted** | `JSON.parse` failures are caught; app falls back to empty defaults |
| **Storage full** | Write failures are silently caught; app continues working in-memory |
| **Reset Board** | Clears `taskOrbit_tasks` and `taskOrbit_logs` from localStorage |
| **Logout** | Clears `taskOrbit_session` from both localStorage and sessionStorage |
### Storage Utility API (`src/utils/storage.js`)
```javascript
getItem(key, fallback)       // Safe JSON parse from localStorage
setItem(key, value)          // Safe JSON stringify to localStorage
removeItem(key)              // Remove key from localStorage
getSessionItem(key, fallback) // Same for sessionStorage
setSessionItem(key, value)    // Same for sessionStorage
removeSessionItem(key)        // Same for sessionStorage
```
All functions wrap their operations in `try/catch` blocks to prevent crashes from storage unavailability or quota errors.

---

## 🛡 Reliability & Error Handling
| Scenario | How It's Handled |
|----------|------------------|
| Empty board state | Columns show "No tasks yet" placeholder |
| Missing localStorage | Falls back to empty defaults without crashing |
| Corrupted JSON in storage | `JSON.parse` wrapped in try/catch, returns fallback |
| Empty task title | Form validates title as required; shows inline error |
| Accidental delete | Confirmation dialog required before any deletion |
| Accidental board reset | Confirmation dialog: "All tasks and logs will be permanently deleted" |
| Accidental drag | 5px activation distance prevents unintentional moves |
| Direct URL access to `/board` | `ProtectedRoute` redirects to login if unauthenticated |
| Unknown routes | Catch-all `*` route redirects to `/` |

---

## 🧪 Testing
The project includes **12 tests** across 3 test files using **Vitest** and **React Testing Library**.
### Test Files
| File | Tests | What's Covered |
|------|-------|----------------|
| `Login.test.jsx` | 3 | Invalid credentials error, empty field validation, field rendering |
| `TaskContext.test.jsx` | 5 | Empty state, task creation, deletion, status move, activity logging |
| `TaskCard.test.jsx` | 4 | Title rendering, priority badge, tags display, due date indicator |
### Running Tests
```bash
# Run all tests once
npm test
# Run in watch mode
npm run test:watch
```
### Test Configuration
Tests run via **Vitest** with the following setup (`vite.config.js`):
- **Environment:** `jsdom` (simulates browser DOM)
- **Globals:** `true` (no need to import `describe`, `it`, `expect`)
- **Setup file:** `src/setupTests.js` (loads `@testing-library/jest-dom` matchers)
- **CSS:** `true` (CSS imports are processed during tests)

---

## 📜 Available Scripts
| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server with HMR at port 5173 |
| `build` | `npm run build` | Build optimized production bundle to `dist/` |
| `preview` | `npm run preview` | Preview production build locally |
| `test` | `npm test` | Run all tests once via Vitest |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |

---

## 🎨 Design System
### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Accent | `#a855f7` | Buttons, links, active states |
| Hot Pink | `#f472b6` | Todo column theme |
| Electric Yellow | `#facc15` | Doing column theme |
| Mint Green | `#34d399` | Done column, Low priority |
| Sunset Orange | `#fb923c` | Medium priority |
| Rose Red | `#f43f5e` | High priority, danger actions |
| Background | `#0a0a0f` | Page background |
| Surface | `#12121a` | Cards, panels |
### Priority Colors
| Priority | Color | Visual |
|----------|-------|--------|
| Low | `#34d399` (Mint Green) | 🟢 |
| Medium | `#fb923c` (Sunset Orange) | 🟠 |
| High | `#f43f5e` (Rose Red) | 🔴 |

---

## License
MIT — See [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) for details.

---

<div align="center">
**Built with ❤️ by [MadtorXD](https://github.com/MadtorXD)**
</div>
