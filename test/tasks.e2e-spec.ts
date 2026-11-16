import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TasksController } from '../src/tasks/controllers/tasks.controller';
import { TasksService } from '../src/tasks/services/tasks.service';

describe('Tasks HTTP API (e2e)', () => {
  let app: INestApplication;
  const service = {
    create: jest.fn().mockResolvedValue({ id: 'd9428888-122b-4b1a-9f1a-5c8c5f3d8f01', title: 'New task' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 }),
    findOne: jest.fn().mockResolvedValue({ id: 'd9428888-122b-4b1a-9f1a-5c8c5f3d8f01', title: 'Existing' }),
    update: jest.fn(), remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: service }],
    }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => app.close());

  it('creates a task and returns 201', async () => {
    await request(app.getHttpServer()).post('/api/v1/tasks')
      .send({ title: 'New task', responsible: 'Alex', dueDate: '2026-12-01' })
      .expect(201);
    expect(service.create).toHaveBeenCalled();
  });

  it('rejects invalid payloads with 400', async () => {
    await request(app.getHttpServer()).post('/api/v1/tasks')
      .send({ title: '', responsible: 'Alex', dueDate: 'not-a-date', extra: true })
      .expect(400);
  });

  it('lists tasks with 200', async () => {
    await request(app.getHttpServer()).get('/api/v1/tasks?page=1&limit=20').expect(200);
    expect(service.list).toHaveBeenCalled();
  });
});
