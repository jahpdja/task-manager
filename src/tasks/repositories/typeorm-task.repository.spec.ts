import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';
import { TypeOrmTaskRepository } from './typeorm-task.repository';

describe('TypeOrmTaskRepository', () => {
  it('applies filters, ordering and bounded pagination to the query builder', async () => {
    const qb: any = {
      andWhere: jest.fn().mockReturnThis(), orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(), skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(), getManyAndCount: jest.fn().mockResolvedValue([[new Task()], 21]),
    };
    const orm = { create: jest.fn(), save: jest.fn(), findOne: jest.fn(), remove: jest.fn(), createQueryBuilder: jest.fn().mockReturnValue(qb) } as unknown as Repository<Task>;
    const repository = new TypeOrmTaskRepository(orm);
    const result = await repository.findMany({ status: 'done' as any, responsible: 'a@example.com', page: 2, limit: 10 });
    expect(qb.andWhere).toHaveBeenCalledTimes(2);
    expect(qb.skip).toHaveBeenCalledWith(10);
    expect(qb.take).toHaveBeenCalledWith(10);
    expect(result).toMatchObject({ total: 21, page: 2, limit: 10, totalPages: 3 });
  });
});
