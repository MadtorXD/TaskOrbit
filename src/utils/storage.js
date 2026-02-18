/**
 * Safe localStorage utility with JSON serialization and error handling.
 */

export function getItem(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Storage full or unavailable — fail silently
    }
}

export function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // Fail silently
    }
}

/* Session storage variants (for non-Remember-Me sessions) */

export function getSessionItem(key, fallback = null) {
    try {
        const raw = sessionStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function setSessionItem(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Fail silently
    }
}

export function removeSessionItem(key) {
    try {
        sessionStorage.removeItem(key);
    } catch {
        // Fail silently
    }
}
