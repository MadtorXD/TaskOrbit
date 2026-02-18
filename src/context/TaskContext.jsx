import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getItem, setItem } from '../utils/storage';

const TaskContext = createContext(null);

const TASKS_KEY = 'taskOrbit_tasks';
const LOGS_KEY = 'taskOrbit_logs';

function loadTasks() {
    const stored = getItem(TASKS_KEY, []);
    return Array.isArray(stored) ? stored : [];
}

function loadLogs() {
    const stored = getItem(LOGS_KEY, []);
    return Array.isArray(stored) ? stored : [];
}

function persistTasks(tasks) {
    setItem(TASKS_KEY, tasks);
}

function persistLogs(logs) {
    setItem(LOGS_KEY, logs);
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(loadTasks);
    const [logs, setLogs] = useState(loadLogs);

    // Search, filter, sort state
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [sortByDueDate, setSortByDueDate] = useState(false);

    const addLog = useCallback((action) => {
        setLogs((prev) => {
            const updated = [
                { id: uuidv4(), action, timestamp: new Date().toISOString() },
                ...prev,
            ].slice(0, 50); // keep last 50 entries
            persistLogs(updated);
            return updated;
        });
    }, []);

    const addTask = useCallback((taskData) => {
        const newTask = {
            id: uuidv4(),
            title: taskData.title.trim(),
            description: taskData.description?.trim() || '',
            priority: taskData.priority || 'Medium',
            dueDate: taskData.dueDate || '',
            tags: taskData.tags?.trim() || '',
            createdAt: new Date().toISOString(),
            status: taskData.status || 'Todo',
        };
        setTasks((prev) => {
            const updated = [...prev, newTask];
            persistTasks(updated);
            return updated;
        });
        addLog(`Created task "${newTask.title}"`);
        return newTask;
    }, [addLog]);

    const editTask = useCallback((id, changes) => {
        setTasks((prev) => {
            const updated = prev.map((t) =>
                t.id === id ? { ...t, ...changes } : t
            );
            persistTasks(updated);
            return updated;
        });
        addLog(`Edited task "${changes.title || 'Untitled'}"`);
    }, [addLog]);

    const deleteTask = useCallback((id) => {
        let taskTitle = '';
        setTasks((prev) => {
            const target = prev.find((t) => t.id === id);
            taskTitle = target?.title || 'Unknown';
            const updated = prev.filter((t) => t.id !== id);
            persistTasks(updated);
            return updated;
        });
        addLog(`Deleted task "${taskTitle}"`);
    }, [addLog]);

    const moveTask = useCallback((id, newStatus) => {
        let taskTitle = '';
        setTasks((prev) => {
            const target = prev.find((t) => t.id === id);
            if (!target || target.status === newStatus) return prev;
            taskTitle = target.title;
            const updated = prev.map((t) =>
                t.id === id ? { ...t, status: newStatus } : t
            );
            persistTasks(updated);
            return updated;
        });
        if (taskTitle) {
            addLog(`Moved "${taskTitle}" to ${newStatus}`);
        }
    }, [addLog]);

    const resetBoard = useCallback(() => {
        setTasks([]);
        setLogs([]);
        persistTasks([]);
        persistLogs([]);
    }, []);

    // Derived: filtered + sorted tasks
    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        // Search by title
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter((t) => t.title.toLowerCase().includes(term));
        }

        // Filter by priority
        if (priorityFilter !== 'All') {
            result = result.filter((t) => t.priority === priorityFilter);
        }

        // Sort by due date ascending (empty dates last)
        if (sortByDueDate) {
            result.sort((a, b) => {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        }

        return result;
    }, [tasks, searchTerm, priorityFilter, sortByDueDate]);

    const getTasksByStatus = useCallback(
        (status) => filteredTasks.filter((t) => t.status === status),
        [filteredTasks]
    );

    return (
        <TaskContext.Provider
            value={{
                tasks: filteredTasks,
                logs,
                searchTerm,
                setSearchTerm,
                priorityFilter,
                setPriorityFilter,
                sortByDueDate,
                setSortByDueDate,
                addTask,
                editTask,
                deleteTask,
                moveTask,
                resetBoard,
                getTasksByStatus,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error('useTasks must be used within TaskProvider');
    return ctx;
}
