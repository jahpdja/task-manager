import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../services/tasks.service';

describe('TasksController', () => {
  it('delegates task creation to the application service', async () => {
    const created = { id: 'id', title: 'Test' };
    const service = { create: jest.fn().mockResolvedValue(created) };
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: service }],
    }).compile();
    const controller = module.get(TasksController);
    await expect(controller.create({ title: 'Test' } as any)).resolves.toBe(created);
    expect(service.create).toHaveBeenCalledWith({ title: 'Test' });
  });
});
