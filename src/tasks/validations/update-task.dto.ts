import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10000)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  responsible?: string;

  @IsOptional()
  @IsDateString({ strict: true })
  dueDate?: string;
}
