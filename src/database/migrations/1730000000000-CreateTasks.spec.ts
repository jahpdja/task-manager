import { QueryRunner } from 'typeorm';
import { CreateTasks1730000000000 } from './1730000000000-CreateTasks';

describe('CreateTasks migration', () => {
  it('creates the task status enum, table and indexes', async () => {
    const queryRunner = { query: jest.fn().mockResolvedValue(undefined) } as unknown as QueryRunner;
    await new CreateTasks1730000000000().up(queryRunner);
    const sql = (queryRunner.query as jest.Mock).mock.calls.map(([statement]) => statement).join('\n');
    expect(sql).toContain('CREATE TYPE "tasks_status_enum"');
    expect(sql).toContain('CREATE TABLE "tasks"');
    expect(sql).toContain('gen_random_uuid()');
    expect(sql).toContain('IDX_tasks_responsible');
  });

  it('drops the task schema in reverse dependency order', async () => {
    const queryRunner = { query: jest.fn().mockResolvedValue(undefined) } as unknown as QueryRunner;
    await new CreateTasks1730000000000().down(queryRunner);
    expect(queryRunner.query).toHaveBeenCalledTimes(5);
    expect((queryRunner.query as jest.Mock).mock.calls[4][0]).toContain('DROP TYPE');
  });
});
