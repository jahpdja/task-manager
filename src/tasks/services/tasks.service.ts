import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../models/task.entity';
import { TaskStatus } from '../models/task-status.enum';
import { CreateTaskDto } from '../validations/create-task.dto';
import { ListTasksQueryDto } from '../validations/list-tasks-query.dto';
import { UpdateTaskDto } from '../validations/update-task.dto';
import { PaginatedTasks, TASK_REPOSITORY, TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_REPOSITORY) private readonly tasks: TaskRepository) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.tasks.create({
      ...dto,
      description: dto.description ?? null,
      status: dto.status ?? TaskStatus.PENDING,
    });
    return this.tasks.save(task);
  }

  list(query: ListTasksQueryDto): Promise<PaginatedTasks> {
    return this.tasks.findMany({
      status: query.status,
      responsible: query.responsible,
      page: query.page,
      limit: query.limit,
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasks.findById(id);
    if (!task) throw new NotFoundException(`Task ${id} was not found`);
    return task;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.tasks.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasks.remove(task);
  }
}
