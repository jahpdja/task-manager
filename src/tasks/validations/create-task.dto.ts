import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Prepare release', maxLength: 160 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @ApiPropertyOptional({ example: 'Review and publish the next version', maxLength: 10000 })
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.PENDING })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ example: 'Alex', maxLength: 254 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(254)
  responsible: string;

  @ApiProperty({ example: '2026-12-01', format: 'date' })
  @IsDateString({ strict: true })
  dueDate: string;
}
