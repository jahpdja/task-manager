import { Task } from '../models/task.entity';
import { TaskStatus } from '../models/task-status.enum';
import { serializeTask } from './task.serializer';

describe('serializeTask', () => {
  it('returns the explicit API representation', () => {
    const task = Object.assign(new Task(), {
      id: 'uuid', title: 'Task', description: null, status: TaskStatus.PENDING,
      responsible: 'a@example.com', dueDate: '2026-12-01',
      createdAt: new Date('2026-01-01T00:00:00Z'), updatedAt: new Date('2026-01-02T00:00:00Z'),
    });
    expect(serializeTask(task)).toEqual({
      id: 'uuid', title: 'Task', description: null, status: 'pending',
      responsible: 'a@example.com', dueDate: '2026-12-01',
      createdAt: task.createdAt, updatedAt: task.updatedAt,
    });
    expect(serializeTask(task)).not.toHaveProperty('password');
  });
});
