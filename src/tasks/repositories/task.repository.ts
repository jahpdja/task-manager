import { Task } from '../models/task.entity';
import { TaskStatus } from '../models/task-status.enum';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskFilters {
  status?: TaskStatus;
  responsible?: string;
  page: number;
  limit: number;
}

export interface PaginatedTasks {
  items: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TaskRepository {
  create(data: Partial<Task>): Task;
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findMany(filters: TaskFilters): Promise<PaginatedTasks>;
  remove(task: Task): Promise<void>;
}
