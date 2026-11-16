import { NotFoundException } from '@nestjs/common';
import { Task } from '../models/task.entity';
import { TaskStatus } from '../models/task-status.enum';
import { TaskRepository } from '../repositories/task.repository';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn((data) => Object.assign(new Task(), data)),
      save: jest.fn(async (task) => Object.assign(task, { id: 'task-id' })),
      findById: jest.fn(),
      findMany: jest.fn(),
      remove: jest.fn(),
    };
    service = new TasksService(repository);
  });

  it('creates tasks with pending as the default status', async () => {
    const result = await service.create({
      title: 'Task', responsible: 'a@example.com', dueDate: '2026-12-01',
    });
    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({ status: TaskStatus.PENDING }));
    expect(result.id).toBe('task-id');
  });

  it('delegates filters and pagination to the repository', async () => {
    repository.findMany.mockResolvedValue({ items: [], total: 0, page: 2, limit: 10, totalPages: 0 });
    await service.list({ page: 2, limit: 10, status: TaskStatus.DONE, responsible: 'a@example.com' });
    expect(repository.findMany).toHaveBeenCalledWith({
      page: 2, limit: 10, status: TaskStatus.DONE, responsible: 'a@example.com',
    });
  });

  it('throws 404 when the task does not exist', async () => {
    repository.findById.mockResolvedValue(null);
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('updates and removes an existing task', async () => {
    const task = Object.assign(new Task(), { id: 'task-id', title: 'Old' });
    repository.findById.mockResolvedValue(task);
    await service.update('task-id', { title: 'New' });
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ title: 'New' }));
    await service.remove('task-id');
    expect(repository.remove).toHaveBeenCalledWith(task);
  });
});
