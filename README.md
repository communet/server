# CommuNet

This is server part of CommuNet service

## Setup

For setup all requirements follow steps:

1. Install `docker` and `docker-compose` (it's part of Docker Desktop in Windows), `nodejs` and `npm`.
2. Fill credentials for external services in `.env` by copy and renaming `.env.example`.
3. Run `docker compose up -d` for pull and set up external services, like database, redis, etc.
4. Run `npm ci` for install dependencies from `package-lock.json`.
5. Run `npm run migration:run` for apply migrations to database.
6. Go to `localhost:{ADMINER_PORT}` where `{ADMINER_PORT}` is value of ADMINER_PORT variable and login by using your credentials from `.env`.
7. Create database named like `{DB_NAME}-test` where `{DB_NAME}` is value of DB_NAME variable in `.env`.
8. Run `NODE_ENV=test npm run migration:run` (for unix) or `set NODE_ENV=test npm run migration:run` (for Windows).
9. Congratulation! Now you can start the server by `npm run start`

## Commands

All commands run by `npm run {command-name}` where `{command-name}` - name one of following commands:

- `start` - Start server.
- `check:format` - Run `prettier` formatter for checking all project.
- `check:format:fix` - Run `prettier` for check. Will fix all errors if it's possible.
- `check:lint` - Similar `check:format` but run `eslint` instead `prettier`.
- `check:lint:fix` - Similar `check:format:fix` but run `eslint` instead `prettier`.
- `check:types` - Run `tsc` for check type in all project.
- `check` - Run all checkers.
- `db` - Getting access to `knex` command with some fixes at all operation systems.
- `migration:make` - Create migration file.
- `migration:run` - Apply all have not yet been applied.
- `migration:rollback` - Rollback latest batch migration.
- `migration:up` - Apply next migration that has not yet been applied.
- `migration:down` - Undo latest migration.
- `migration:list` - Show list both completed and pending migrations.
- `seed:make` - Create seed file for database.
- `seed:run` - Apply every seed file to database.
- `test:core` - Run core tests (cover only core layer).
- `test:application` - Run application tests (cover only application layer).
- `test:infra` - Run infrastructure tests (cover only infrastructure layer).
- `test` - Run all test.
