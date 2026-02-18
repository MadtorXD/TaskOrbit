import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <TaskProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/board"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </TaskProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
