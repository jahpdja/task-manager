import {
  Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity({ name: 'tasks' })
@Index('IDX_tasks_status', ['status'])
@Index('IDX_tasks_responsible', ['responsible'])
@Index('IDX_tasks_due_date', ['dueDate'])
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 160 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: TaskStatus, enumName: 'tasks_status_enum', default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'varchar', length: 254 })
  responsible: string;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
