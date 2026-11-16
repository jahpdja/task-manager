import { of } from 'rxjs';
import { Task } from '../models/task.entity';
import { TaskStatus } from '../models/task-status.enum';
import { TaskResponseInterceptor } from './task-response.interceptor';

describe('TaskResponseInterceptor', () => {
  it('serializes task entities inside paginated responses', async () => {
    const task = Object.assign(new Task(), {
      id: 'id', title: 'Title', description: null, status: TaskStatus.DONE,
      responsible: 'a@example.com', dueDate: '2026-12-01',
      createdAt: new Date(), updatedAt: new Date(),
    });
    const interceptor = new TaskResponseInterceptor();
    const result = await new Promise<any>((resolve) =>
      interceptor.intercept({} as any, { handle: () => of({ items: [task], total: 1 }) } as any)
        .subscribe(resolve),
    );
    expect(result.items[0]).toMatchObject({ id: 'id', status: 'done' });
    expect(result.items[0]).not.toBe(task);
  });
});
