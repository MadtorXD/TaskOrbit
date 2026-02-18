import { useState, useEffect } from 'react';

const EMPTY_FORM = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    tags: '',
};

export default function TaskModal({ task, status, onSave, onClose }) {
    const isEdit = !!task;
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'Medium',
                dueDate: task.dueDate || '',
                tags: task.tags || '',
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!form.title.trim()) {
            setError('Title is required');
            return;
        }

        onSave({
            ...form,
            status: task?.status || status || 'Todo',
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="task-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEdit ? 'Edit Task' : 'New Task'}</h2>
                    <button className="btn-icon" onClick={onClose} aria-label="Close">✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div className="modal-error">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="task-title">Title *</label>
                        <input
                            id="task-title"
                            name="title"
                            type="text"
                            placeholder="What needs to be done?"
                            value={form.title}
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-desc">Description</label>
                        <textarea
                            id="task-desc"
                            name="description"
                            rows="3"
                            placeholder="Add details…"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row-fields">
                        <div className="form-group">
                            <label htmlFor="task-priority">Priority</label>
                            <select
                                id="task-priority"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="task-due">Due Date</label>
                            <input
                                id="task-due"
                                name="dueDate"
                                type="date"
                                value={form.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-tags">Tags <span className="label-hint">(comma separated)</span></label>
                        <input
                            id="task-tags"
                            name="tags"
                            type="text"
                            placeholder="e.g. frontend, bug, urgent"
                            value={form.tags}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
