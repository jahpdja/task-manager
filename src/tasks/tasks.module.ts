import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { TasksController } from './controllers/tasks.controller';
import { TASK_REPOSITORY } from './repositories/task.repository';
import { TypeOrmTaskRepository } from './repositories/typeorm-task.repository';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    TypeOrmTaskRepository,
    { provide: TASK_REPOSITORY, useExisting: TypeOrmTaskRepository },
  ],
  exports: [TasksService],
})
export class TasksModule {}
