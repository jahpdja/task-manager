import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  ParseUUIDPipe, Patch, Post, Query, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse,
  ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, getSchemaPath,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../validations/create-task.dto';
import { ListTasksQueryDto } from '../validations/list-tasks-query.dto';
import { UpdateTaskDto } from '../validations/update-task.dto';
import { TaskResponseInterceptor } from '../interceptors/task-response.interceptor';
import { TaskResponseDto } from '../swagger/task-response.dto';

@ApiTags('Tasks')
@ApiExtraModels(TaskResponseDto)
@Controller('tasks')
@UseInterceptors(TaskResponseInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({ description: 'Task created successfully.', type: TaskResponseDto })
  @ApiBadRequestResponse({ description: 'Request validation failed.' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List tasks with filters and pagination' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'in_progress', 'done'] })
  @ApiQuery({ name: 'responsible', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20, maximum: 100 })
  @ApiOkResponse({
    description: 'Paginated task list.',
    schema: {
      type: 'object',
      properties: {
        items: { type: 'array', items: { $ref: getSchemaPath(TaskResponseDto) } },
        total: { type: 'integer', example: 42 },
        page: { type: 'integer', example: 1 },
        limit: { type: 'integer', example: 20 },
        totalPages: { type: 'integer', example: 3 },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid filters or pagination values.' })
  findAll(@Query() query: ListTasksQueryDto) {
    return this.tasksService.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by UUID' })
  @ApiParam({ name: 'id', description: 'Task UUID', format: 'uuid' })
  @ApiOkResponse({ description: 'Task found.', type: TaskResponseDto })
  @ApiBadRequestResponse({ description: 'The supplied ID is not a valid UUID.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task UUID', format: 'uuid' })
  @ApiOkResponse({ description: 'Task updated successfully.', type: TaskResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid ID or request body.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task UUID', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Task deleted successfully.' })
  @ApiBadRequestResponse({ description: 'The supplied ID is not a valid UUID.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.remove(id);
  }
}
