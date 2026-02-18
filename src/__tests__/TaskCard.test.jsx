import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    DndContext,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from '../components/TaskCard';

const mockTask = {
    id: 'test-1',
    title: 'Design Landing Page',
    description: 'Create the new homepage design',
    priority: 'High',
    dueDate: '2026-03-01',
    tags: 'design, frontend',
    createdAt: '2026-02-18T12:00:00Z',
    status: 'Todo',
};

function renderCard(task = mockTask) {
    return render(
        <DndContext>
            <SortableContext items={[task.id]} strategy={verticalListSortingStrategy}>
                <TaskCard task={task} onEdit={vi.fn()} onDelete={vi.fn()} />
            </SortableContext>
        </DndContext>
    );
}

describe('TaskCard', () => {
    it('renders task title', () => {
        renderCard();
        expect(screen.getByText('Design Landing Page')).toBeInTheDocument();
    });

    it('displays priority badge', () => {
        renderCard();
        expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('shows tags', () => {
        renderCard();
        expect(screen.getByText('design')).toBeInTheDocument();
        expect(screen.getByText('frontend')).toBeInTheDocument();
    });

    it('shows due date icon when date is set', () => {
        renderCard();
        // The meta-item containing the date emoji should be present
        const metaItems = document.querySelectorAll('.meta-item');
        expect(metaItems.length).toBeGreaterThan(0);
    });
});
