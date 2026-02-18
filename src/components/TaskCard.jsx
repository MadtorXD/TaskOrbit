import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const PRIORITY_COLORS = {
    Low: '#22c55e',
    Medium: '#f59e0b',
    High: '#ef4444',
};

export default function TaskCard({ task, onEdit, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const tags = task.tags
        ? task.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="task-card"
            {...attributes}
            {...listeners}
        >
            <div className="card-header">
                <span
                    className="priority-badge"
                    style={{ background: PRIORITY_COLORS[task.priority] || '#6b7280' }}
                >
                    {task.priority}
                </span>
                <div className="card-actions">
                    <button
                        className="btn-icon-sm"
                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                        aria-label="Edit task"
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn-icon-sm"
                        onClick={(e) => { e.stopPropagation(); onDelete(task); }}
                        aria-label="Delete task"
                        title="Delete"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <h3 className="card-title">{task.title}</h3>

            {task.description && (
                <p className="card-desc">{task.description}</p>
            )}

            <div className="card-meta">
                {task.dueDate && (
                    <span className="meta-item">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>

            {tags.length > 0 && (
                <div className="card-tags">
                    {tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
