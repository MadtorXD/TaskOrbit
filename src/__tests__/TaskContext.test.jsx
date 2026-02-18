import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TaskProvider, useTasks } from '../context/TaskContext';

function setup() {
    return renderHook(() => useTasks(), { wrapper: TaskProvider });
}

describe('TaskContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('starts with empty tasks', () => {
        const { result } = setup();
        expect(result.current.tasks).toEqual([]);
    });

    it('adds a task', () => {
        const { result } = setup();

        act(() => {
            result.current.addTask({
                title: 'Test Task',
                priority: 'High',
                status: 'Todo',
            });
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks[0].title).toBe('Test Task');
        expect(result.current.tasks[0].priority).toBe('High');
        expect(result.current.tasks[0].status).toBe('Todo');
    });

    it('deletes a task', () => {
        const { result } = setup();

        let taskId;
        act(() => {
            const task = result.current.addTask({
                title: 'To Delete',
                priority: 'Low',
                status: 'Todo',
            });
            taskId = task.id;
        });

        expect(result.current.tasks).toHaveLength(1);

        act(() => {
            result.current.deleteTask(taskId);
        });

        expect(result.current.tasks).toHaveLength(0);
    });

    it('moves a task to a different status', () => {
        const { result } = setup();

        let taskId;
        act(() => {
            const task = result.current.addTask({
                title: 'Movable',
                priority: 'Medium',
                status: 'Todo',
            });
            taskId = task.id;
        });

        act(() => {
            result.current.moveTask(taskId, 'Done');
        });

        expect(result.current.tasks[0].status).toBe('Done');
    });

    it('logs activity on task creation', () => {
        const { result } = setup();

        act(() => {
            result.current.addTask({ title: 'Logged Task', status: 'Todo' });
        });

        expect(result.current.logs).toHaveLength(1);
        expect(result.current.logs[0].action).toContain('Created task');
    });
});
