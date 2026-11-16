# Swagger / OpenAPI module

Swagger setup is isolated in `src/swagger/swagger.config.ts`; functional modules contribute metadata through NestJS Swagger decorators.

## URLs

- Swagger UI: `/api/docs`
- OpenAPI JSON: `/api/docs/openapi.json`
- Versioned REST API: `/api/v1`

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `SWAGGER_TITLE` | `Task Manager API` | Document title |
| `SWAGGER_VERSION` | `1.0.0` | API document version |
| `SWAGGER_PATH` | `api/docs` | UI and JSON document base path |

## Adding a module

1. Add `@ApiTags('ModuleName')` to its controller.
2. Describe operations with `@ApiOperation`.
3. Document query/path parameters and success/error responses.
4. Add `@ApiProperty` or `@ApiPropertyOptional` to DTO properties.
5. Add a guide under `docs/modules/<module-name>/README.md` and link it from `docs/README.md`.

Swagger is initialized once during application bootstrap. The documentation route is intentionally separate from the versioned API prefix.
