import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('TaskOrbit crashed:', error, info);
    }

    handleReset = () => {
        // Clear potentially corrupted data
        try {
            localStorage.removeItem('taskOrbit_session');
            localStorage.removeItem('taskOrbit_tasks');
            localStorage.removeItem('taskOrbit_logs');
            sessionStorage.removeItem('taskOrbit_session');
        } catch { /* ignore */ }
        this.setState({ hasError: false });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0f',
                    color: '#eeeef5',
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'center',
                    padding: '2rem',
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#a855f7' }}>
                            Something went wrong
                        </h1>
                        <p style={{ color: '#a0a0c0', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            The app ran into an issue. Click below to reset and try again.
                        </p>
                        <button
                            onClick={this.handleReset}
                            style={{
                                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.7rem 1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                        >
                            Reset & Reload
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
