# Task Manager API

REST API for task management, implemented with NestJS, TypeORM and PostgreSQL.

## Requirements

- Node.js 20+
- npm 10+
- Docker / Docker Compose (or a PostgreSQL 13+ instance)

## Quick start

```bash
cp .env.example .env
docker compose up -d postgres
npm install
npm run migration:run
npm run start:dev
```

The API is available at `http://localhost:3000/api/v1`. For production, run `npm run build` and `npm run start:prod`. Interactive OpenAPI documentation is available at `http://localhost:3000/api/docs` and the JSON document at `/api/docs/openapi.json`. Schema synchronization is disabled; database changes must use reviewed migrations.

## Environment

Configure `PORT`, `API_PREFIX`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, optional `DATABASE_URL`, and `DATABASE_SSL` using `.env.example`. A configured `DATABASE_URL` takes precedence. Never commit real credentials.

## Task model

- `id`: PostgreSQL UUID.
- `title`: required string, max 160 characters.
- `description`: optional text.
- `status`: `pending`, `in_progress`, or `done` (default `pending`).
- `responsible`: required string identifier/name (max 254 characters).
- `dueDate`: required ISO 8601 date.
- `createdAt`, `updatedAt`: server-managed timestamps.

## REST API

All routes use the `/api/v1` prefix.

| Method | Route | Success |
| --- | --- | --- |
| POST | /tasks | 201 Created |
| GET | /tasks | 200 OK |
| GET | /tasks/:id | 200 OK |
| PATCH | /tasks/:id | 200 OK |
| DELETE | /tasks/:id | 204 No Content |

List example: `GET /api/v1/tasks?status=in_progress&responsible=Alex&page=1&limit=20`.

Filters are optional. Pagination is 1-based, defaults to page 1 and 20 items, and caps the page size at 100. Results are ordered newest first with a stable UUID tie-breaker. The list response includes `items`, `total`, `page`, `limit`, and `totalPages`.

Create example:

```json
{
  "title": "Prepare release",
  "description": "Review and publish the next version",
  "responsible": "Alex",
  "dueDate": "2026-12-01",
  "status": "pending"
}
```

Unknown properties and invalid fields return 400. Invalid UUIDs return 400 and missing tasks return 404. NestJS standard exception handling formats errors.

## Migrations

Run `npm run migration:run` and roll back with `npm run migration:revert`. Generate a migration with `npm run migration:generate`, then review the SQL before applying. Do not enable TypeORM `synchronize` in production.

## Architecture

- `models`: TypeORM entity and task status enum.
- `validations`: DTOs and class-validator constraints.
- `repositories`: persistence interface and TypeORM adapter.
- `services`: application rules and not-found handling.
- `controllers`: HTTP endpoints and status codes.
- `serializers`: explicit public response shape.
- `interceptors`: serialization boundary.
- `database`: connection configuration and versioned migrations.

The repository interface allows business logic to be tested without a database. Responsible is a string rather than a foreign key because this scope does not define users, authentication, or assignment lifecycle.

## API documentation

Swagger is configured independently in `src/swagger/`; each functional controller and DTO contributes its own OpenAPI metadata. Module-specific guides live under `docs/modules/`. See [documentation index](docs/README.md).

## Tests

Run `npm test`, `npm run test:cov`, or `npm run test:e2e`. Tests are isolated in a dedicated commit. Execute them locally before deployment.

## Technical decisions and next steps

PostgreSQL provides relational persistence and native UUID/enum support. Explicit migrations make schema changes reviewable. Pagination is bounded to avoid unbounded result sets. With more time, add authentication/authorization, user-backed assignees, audit history, soft deletion, optimistic concurrency, structured logging, rate limiting, and CI against PostgreSQL.

## AI usage

AI was used to scaffold the requested NestJS/TypeORM layers and propose DTOs, migration, repository/service boundaries, documentation and tests. Suggestions were reviewed and adapted: database synchronization remains disabled, tests use an injectable repository contract, pagination is bounded, and responsible remains a generic string because the requirements do not define a user model. Build and tests must be run in the target environment before deployment.
