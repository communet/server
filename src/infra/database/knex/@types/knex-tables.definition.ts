import { Permissions } from '@/infra/database/knex/@types/tables';

// NOTE: https://knexjs.org/guide/#typescript
declare module 'knex/types/tables' {
  interface Tables {
    permissions: Permissions;
  }
}
