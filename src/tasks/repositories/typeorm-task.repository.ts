import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';
import { PaginatedTasks, TaskFilters, TaskRepository } from './task.repository';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(@InjectRepository(Task) private readonly repository: Repository<Task>) {}

  create(data: Partial<Task>): Task {
    return this.repository.create(data);
  }

  save(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  findById(id: string): Promise<Task | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findMany(filters: TaskFilters): Promise<PaginatedTasks> {
    const { status, responsible, page, limit } = filters;
    const query = this.repository.createQueryBuilder('task');
    if (status) query.andWhere('task.status = :status', { status });
    if (responsible) query.andWhere('LOWER(task.responsible) = LOWER(:responsible)', { responsible });
    query.orderBy('task.createdAt', 'DESC').addOrderBy('task.id', 'ASC');
    query.skip((page - 1) * limit).take(limit);
    const [items, total] = await query.getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async remove(task: Task): Promise<void> {
    await this.repository.remove(task);
  }
}
