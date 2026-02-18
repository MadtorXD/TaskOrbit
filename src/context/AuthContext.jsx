import { createContext, useContext, useState, useCallback } from 'react';
import {
    getItem, setItem, removeItem,
    getSessionItem, setSessionItem, removeSessionItem
} from '../utils/storage';

const AuthContext = createContext(null);

const SESSION_KEY = 'taskOrbit_session';
const VALID_EMAIL = 'intern@demo.com';
const VALID_PASSWORD = 'intern123';

function getStoredSession() {
    return getItem(SESSION_KEY) || getSessionItem(SESSION_KEY);
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState(() => getStoredSession());

    const login = useCallback((email, password, rememberMe) => {
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            const data = { email, loggedInAt: new Date().toISOString() };
            setSession(data);
            if (rememberMe) {
                setItem(SESSION_KEY, data);
            } else {
                setSessionItem(SESSION_KEY, data);
            }
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
    }, []);

    const logout = useCallback(() => {
        setSession(null);
        removeItem(SESSION_KEY);
        removeSessionItem(SESSION_KEY);
    }, []);

    const isAuthenticated = !!session;

    return (
        <AuthContext.Provider value={{ isAuthenticated, session, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
