import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const COLUMN_LABELS = {
    Todo: '📋 Todo',
    Doing: '🔨 Doing',
    Done: '✅ Done',
};

export default function Column({ status, tasks, onAddTask, onEdit, onDelete }) {
    const { setNodeRef, isOver } = useDroppable({ id: status });

    return (
        <div className={`column ${isOver ? 'column-over' : ''}`} data-status={status}>
            <div className="column-header">
                <h2 className="column-title">{COLUMN_LABELS[status] || status}</h2>
                <span className="column-count">{tasks.length}</span>
            </div>

            <button className="btn-add-task" onClick={() => onAddTask(status)}>
                + Add Task
            </button>

            <div ref={setNodeRef} className="column-body">
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.length === 0 ? (
                        <div className="column-empty">No tasks yet</div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
    );
}
