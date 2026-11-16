# API documentation

This directory contains module-oriented technical documentation. Interactive API documentation is served by Swagger UI at `/api/docs` (OpenAPI JSON: `/api/docs/openapi.json`) when the application is running.

## Modules

- [Tasks](modules/tasks/README.md): task endpoints, validation, filters and pagination.
- [Database](modules/database/README.md): PostgreSQL connection and migration policy.
- [Swagger](modules/swagger/README.md): OpenAPI configuration, endpoints and environment variables.

Keep each module's documentation beside its own module guide so future modules can be documented independently.
