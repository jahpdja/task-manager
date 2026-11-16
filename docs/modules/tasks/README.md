# Tasks module

Base route: `/api/v1/tasks`

All request bodies are validated by the global NestJS `ValidationPipe` with whitelist and rejection of unknown properties.

## Endpoints

| Method | Route | Result |
| --- | --- | --- |
| POST | `/` | 201 — creates a task |
| GET | `/` | 200 — returns a paginated list |
| GET | `/:id` | 200 — returns one task |
| PATCH | `/:id` | 200 — updates a task |
| DELETE | `/:id` | 204 — deletes a task |

## Task fields

- `title`: required string, maximum 160 characters.
- `description`: optional string, maximum 10,000 characters.
- `status`: `pending`, `in_progress` or `done`; defaults to `pending` on creation.
- `responsible`: required string, maximum 254 characters.
- `dueDate`: required strict ISO date (`YYYY-MM-DD`).

The API serializes task responses with `id`, `title`, `description`, `status`, `responsible`, `dueDate`, `createdAt` and `updatedAt`.

## List filters

`GET /api/v1/tasks?status=in_progress&responsible=Alex&page=1&limit=20`

All query parameters are optional:

- `status`: one of the supported task statuses.
- `responsible`: exact responsible value.
- `page`: 1-based page number; default 1.
- `limit`: page size from 1 to 100; default 20.

The response contains `items`, `total`, `page`, `limit` and `totalPages`. Results are newest first.

## Errors

- 400: invalid DTO fields, unsupported properties or malformed UUID.
- 404: task UUID does not exist.
- 204: successful deletion has no response body.

For request/response schemas and a try-it-out interface, use [Swagger UI](/api/docs).
