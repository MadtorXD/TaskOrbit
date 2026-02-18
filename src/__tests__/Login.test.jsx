import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';

function renderLogin() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('Login Page', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('shows error with invalid credentials', async () => {
        const user = userEvent.setup();
        renderLogin();

        await user.type(screen.getByLabelText(/email/i), 'wrong@email.com');
        await user.type(screen.getByLabelText(/password/i), 'wrongpass');
        await user.click(screen.getByRole('button', { name: /sign in/i }));

        expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });

    it('shows error when fields are empty', async () => {
        const user = userEvent.setup();
        renderLogin();

        await user.click(screen.getByRole('button', { name: /sign in/i }));

        expect(screen.getByText(/please enter both/i)).toBeInTheDocument();
    });

    it('renders email and password fields', () => {
        renderLogin();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
});
