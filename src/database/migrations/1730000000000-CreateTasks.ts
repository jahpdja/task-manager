import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasks1730000000000 implements MigrationInterface {
  name = 'CreateTasks1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "tasks_status_enum" AS ENUM ('pending', 'in_progress', 'done')`);
    await queryRunner.query(`CREATE TABLE "tasks" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "title" character varying(160) NOT NULL,
      "description" text,
      "status" "tasks_status_enum" NOT NULL DEFAULT 'pending',
      "responsible" character varying(254) NOT NULL,
      "due_date" date NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id")
    )`);
    await queryRunner.query(`CREATE INDEX "IDX_tasks_status" ON "tasks" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_tasks_responsible" ON "tasks" ("responsible")`);
    await queryRunner.query(`CREATE INDEX "IDX_tasks_due_date" ON "tasks" ("due_date")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_tasks_due_date"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_responsible"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_status"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TYPE "tasks_status_enum"`);
  }
}
