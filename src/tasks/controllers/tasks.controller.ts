import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../validations/create-task.dto';
import { ListTasksQueryDto } from '../validations/list-tasks-query.dto';
import { UpdateTaskDto } from '../validations/update-task.dto';
import { TaskResponseInterceptor } from '../interceptors/task-response.interceptor';

@Controller('tasks')
@UseInterceptors(TaskResponseInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll(@Query() query: ListTasksQueryDto) {
    return this.tasksService.list(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.remove(id);
  }
}
