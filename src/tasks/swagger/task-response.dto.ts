import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../models/task-status.enum';

export class TaskResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Prepare release', maxLength: 160 })
  title: string;

  @ApiProperty({ nullable: true, example: 'Review the next version' })
  description: string | null;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ example: 'Alex', maxLength: 254 })
  responsible: string;

  @ApiProperty({ example: '2026-12-01', format: 'date' })
  dueDate: string;

  @ApiProperty({ format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt: Date;
}
