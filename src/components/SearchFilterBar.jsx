import { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export default function SearchFilterBar() {
    const {
        searchTerm,
        setSearchTerm,
        priorityFilter,
        setPriorityFilter,
        sortByDueDate,
        setSortByDueDate,
        tasks,
    } = useTasks();

    const [localSearch, setLocalSearch] = useState(searchTerm);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);

    // Filter matching tasks for dropdown (show up to 6)
    const matchingTasks = localSearch.trim()
        ? tasks.filter((t) =>
            t.title.toLowerCase().includes(localSearch.trim().toLowerCase())
        ).slice(0, 6)
        : [];

    const applySearch = () => {
        setSearchTerm(localSearch);
        setShowDropdown(false);
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setLocalSearch(val);
        setShowDropdown(val.trim().length > 0);
        // Also apply real-time filtering
        setSearchTerm(val);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') applySearch();
        if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    const handleSelectTask = (task) => {
        setLocalSearch(task.title);
        setSearchTerm(task.title);
        setShowDropdown(false);
    };

    const clearSearch = () => {
        setLocalSearch('');
        setSearchTerm('');
        setShowDropdown(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const STATUS_COLORS = {
        Todo: 'var(--col-todo)',
        Doing: 'var(--col-doing)',
        Done: 'var(--col-done)',
    };

    return (
        <div className="search-filter-bar">
            <div className="search-box-wrapper" ref={wrapperRef}>
                <div className="search-box">
                    <svg className="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search tasks…"
                        value={localSearch}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => localSearch.trim() && setShowDropdown(true)}
                        aria-label="Search tasks"
                    />
                    {localSearch && (
                        <button className="search-clear" onClick={clearSearch} aria-label="Clear search">✕</button>
                    )}
                    <button className="search-go" onClick={applySearch} aria-label="Search" title="Search">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>

                {/* Search Dropdown */}
                {showDropdown && (
                    <div className="search-dropdown">
                        {matchingTasks.length > 0 ? (
                            matchingTasks.map((task) => (
                                <button
                                    key={task.id}
                                    className="search-dropdown-item"
                                    onClick={() => handleSelectTask(task)}
                                >
                                    <span className="dropdown-status-dot" style={{ background: STATUS_COLORS[task.status] || '#888' }} />
                                    <span className="dropdown-title">{task.title}</span>
                                    <span className="dropdown-priority" data-priority={task.priority}>{task.priority}</span>
                                </button>
                            ))
                        ) : (
                            <div className="search-dropdown-empty">No tasks found</div>
                        )}
                    </div>
                )}
            </div>

            <select
                className="filter-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                aria-label="Filter by priority"
            >
                <option value="All">All Priorities</option>
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟠 Medium</option>
                <option value="High">🔴 High</option>
            </select>

            <button
                className={`btn-sort ${sortByDueDate ? 'active' : ''}`}
                onClick={() => setSortByDueDate((v) => !v)}
                title="Sort by due date"
            >
                📅 Sort by Date {sortByDueDate ? '↑' : ''}
            </button>
        </div>
    );
}
