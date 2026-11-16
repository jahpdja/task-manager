import { Task } from '../models/task.entity';

export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: string;
  responsible: string;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export function serializeTask(task: Task): TaskResponse {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? null,
    status: task.status,
    responsible: task.responsible,
    dueDate: task.dueDate,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
