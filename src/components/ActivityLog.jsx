import { useTasks } from '../context/TaskContext';

export default function ActivityLog() {
    const { logs } = useTasks();

    const formatTime = (iso) => {
        const d = new Date(iso);
        return d.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="activity-log">
            <h3 className="log-title">📝 Activity Log</h3>
            {logs.length === 0 ? (
                <p className="log-empty">No activity yet</p>
            ) : (
                <ul className="log-list">
                    {logs.map((entry) => (
                        <li key={entry.id} className="log-item">
                            <span className="log-action">{entry.action}</span>
                            <span className="log-time">{formatTime(entry.timestamp)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
