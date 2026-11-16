import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { TaskStatus } from '../models/task-status.enum';

describe('Task DTO validation', () => {
  it('accepts a valid task payload', async () => {
    const dto = plainToInstance(CreateTaskDto, {
      title: 'Ship API', responsible: 'owner@example.com', dueDate: '2026-12-01',
      status: TaskStatus.PENDING,
    });
    expect(await validate(dto)).toHaveLength(0);
  });

  it('rejects invalid email, date and status values', async () => {
    const dto = plainToInstance(CreateTaskDto, {
      title: '', responsible: 'not-an-email', dueDate: 'tomorrow', status: 'blocked',
    });
    expect((await validate(dto)).length).toBeGreaterThan(0);
  });

  it('allows partial updates while validating provided fields', async () => {
    const dto = plainToInstance(UpdateTaskDto, { title: 'Updated title' });
    expect(await validate(dto)).toHaveLength(0);
    const invalid = plainToInstance(UpdateTaskDto, { status: 'unknown' });
    expect((await validate(invalid)).length).toBeGreaterThan(0);
  });
});
