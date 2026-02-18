import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from '@dnd-kit/core';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Column from '../components/Column';
import SearchFilterBar from '../components/SearchFilterBar';
import ActivityLog from '../components/ActivityLog';
import TaskModal from '../components/TaskModal';
import ConfirmDialog from '../components/ConfirmDialog';

const STATUSES = ['Todo', 'Doing', 'Done'];

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const {
        getTasksByStatus,
        addTask,
        editTask,
        deleteTask,
        moveTask,
        resetBoard,
        tasks,
    } = useTasks();

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [addStatus, setAddStatus] = useState('Todo');

    // Confirm dialog
    const [confirmAction, setConfirmAction] = useState(null);

    // Activity log toggle (mobile)
    const [showLog, setShowLog] = useState(false);

    // Drag state
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const handleAddTask = (status) => {
        setEditingTask(null);
        setAddStatus(status);
        setModalOpen(true);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    const handleDelete = (task) => {
        setConfirmAction({
            message: `Delete "${task.title}"? This cannot be undone.`,
            action: () => deleteTask(task.id),
        });
    };

    const handleSave = (formData) => {
        if (editingTask) {
            editTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }
        setModalOpen(false);
        setEditingTask(null);
    };

    const handleResetBoard = () => {
        setConfirmAction({
            message: 'Reset the entire board? All tasks and logs will be permanently deleted.',
            action: () => resetBoard(),
        });
    };

    /* --- Drag & Drop --- */
    const findTaskById = (id) => tasks.find((t) => t.id === id);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        setActiveId(null);
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;
        let newStatus = null;

        // Dropped on a column droppable
        if (STATUSES.includes(over.id)) {
            newStatus = over.id;
        } else {
            // Dropped on another task — find its status
            const overTask = findTaskById(over.id);
            if (overTask) newStatus = overTask.status;
        }

        if (newStatus) {
            moveTask(taskId, newStatus);
        }
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="10" fill="#6366f1" />
                        <path d="M12 14h16M12 20h10M12 26h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <h1>TaskOrbit</h1>
                </div>
                <div className="header-right">
                    <button className="btn btn-ghost" onClick={() => setShowLog((v) => !v)}>
                        📝 Log
                    </button>
                    <button className="btn btn-ghost btn-danger-text" onClick={handleResetBoard}>
                        Reset Board
                    </button>
                    <button className="btn btn-secondary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Search / Filter / Sort */}
            <SearchFilterBar />

            {/* Board */}
            <div className="board-wrapper">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="board">
                        {STATUSES.map((status) => (
                            <Column
                                key={status}
                                status={status}
                                tasks={getTasksByStatus(status)}
                                onAddTask={handleAddTask}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                    <DragOverlay>
                        {activeId ? (
                            <div className="task-card drag-overlay">
                                <h3 className="card-title">{findTaskById(activeId)?.title}</h3>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                {/* Activity Log Sidebar */}
                <aside className={`log-sidebar ${showLog ? 'open' : ''}`}>
                    <ActivityLog />
                </aside>
            </div>

            {/* Task Modal */}
            {modalOpen && (
                <TaskModal
                    task={editingTask}
                    status={addStatus}
                    onSave={handleSave}
                    onClose={() => { setModalOpen(false); setEditingTask(null); }}
                />
            )}

            {/* Confirm Dialog */}
            {confirmAction && (
                <ConfirmDialog
                    message={confirmAction.message}
                    onConfirm={() => { confirmAction.action(); setConfirmAction(null); }}
                    onCancel={() => setConfirmAction(null)}
                />
            )}
        </div>
    );
}
