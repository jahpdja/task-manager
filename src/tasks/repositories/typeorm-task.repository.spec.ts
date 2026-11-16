import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';
import { TypeOrmTaskRepository } from './typeorm-task.repository';

describe('TypeOrmTaskRepository', () => {
  it('delegates create, save, lookup and delete operations', async () => {
    const task = new Task();
    const orm = {
      create: jest.fn().mockReturnValue(task),
      save: jest.fn().mockResolvedValue(task),
      findOne: jest.fn().mockResolvedValue(task),
      remove: jest.fn().mockResolvedValue(task),
    } as unknown as Repository<Task>;
    const repository = new TypeOrmTaskRepository(orm);
    expect(repository.create({ title: 'Task' })).toBe(task);
    await expect(repository.save(task)).resolves.toBe(task);
    await expect(repository.findById('uuid')).resolves.toBe(task);
    await repository.remove(task);
    expect(orm.create).toHaveBeenCalledWith({ title: 'Task' });
    expect(orm.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
    expect(orm.remove).toHaveBeenCalledWith(task);
  });

  it('applies filters, ordering and pagination to the query builder', async () => {
    const qb: any = {
      andWhere: jest.fn().mockReturnThis(), orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(), skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(), getManyAndCount: jest.fn().mockResolvedValue([[new Task()], 21]),
    };
    const orm = { createQueryBuilder: jest.fn().mockReturnValue(qb) } as unknown as Repository<Task>;
    const repository = new TypeOrmTaskRepository(orm);
    const result = await repository.findMany({ status: 'done' as any, responsible: 'Alex', page: 2, limit: 10 });
    expect(qb.andWhere).toHaveBeenCalledTimes(2);
    expect(qb.skip).toHaveBeenCalledWith(10);
    expect(qb.take).toHaveBeenCalledWith(10);
    expect(result).toMatchObject({ total: 21, page: 2, limit: 10, totalPages: 3 });
  });
});
