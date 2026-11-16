import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Prepare release', maxLength: 160 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title?: string;

  @ApiPropertyOptional({ example: 'Review and publish the next version', maxLength: 10000 })
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ example: 'Alex', maxLength: 254 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(254)
  responsible?: string;

  @ApiPropertyOptional({ example: '2026-12-01', format: 'date' })
  @IsOptional()
  @IsDateString({ strict: true })
  dueDate?: string;
}
