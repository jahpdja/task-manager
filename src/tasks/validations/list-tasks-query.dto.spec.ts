import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ListTasksQueryDto } from './list-tasks-query.dto';
import { TaskStatus } from '../models/task-status.enum';

describe('ListTasksQueryDto', () => {
  it('uses the default page and page size', () => {
    const query = plainToInstance(ListTasksQueryDto, {});
    expect(query.page).toBe(1);
    expect(query.limit).toBe(20);
  });

  it('converts query values and accepts supported filters', async () => {
    const query = plainToInstance(ListTasksQueryDto, {
      page: '3', limit: '50', status: TaskStatus.IN_PROGRESS, responsible: 'Alex',
    });
    expect(query.page).toBe(3);
    expect(query.limit).toBe(50);
    expect(await validate(query)).toHaveLength(0);
  });

  it('rejects invalid status and page size', async () => {
    const query = plainToInstance(ListTasksQueryDto, { page: '0', limit: '101', status: 'paused' });
    expect((await validate(query)).length).toBeGreaterThan(0);
  });
});
