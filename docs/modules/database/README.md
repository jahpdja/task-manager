# Database module

The application uses PostgreSQL through TypeORM. Runtime connection settings are read from `ConfigService`.

## Environment

| Variable | Default | Description |
| --- | --- | --- |
| `DATABASE_HOST` | `localhost` | PostgreSQL host |
| `DATABASE_PORT` | `5432` | PostgreSQL port |
| `DATABASE_USER` | `postgres` | Database user |
| `DATABASE_PASSWORD` | `postgres` | Database password |
| `DATABASE_NAME` | `task_manager` | Database name |
| `DATABASE_URL` | empty | Optional connection URL; takes precedence in TypeORM |
| `DATABASE_SSL` | `false` | Enables SSL with `rejectUnauthorized: false` when set to `true` |

Configuration values are explicitly read as strings before port conversion. This prevents the ConfigService overload from widening database and password values to incompatible types.

## Schema management

TypeORM `synchronize` is disabled. All schema changes must be made through reviewed migrations:

- `npm run migration:generate`
- `npm run migration:run`
- `npm run migration:revert`

Never commit real database credentials. Use a local `.env` file or the deployment secret manager.
