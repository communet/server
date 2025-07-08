import { Permissions } from './tables';

// NOTE: https://knexjs.org/guide/#typescript
declare module 'knex/types/tables' {
  interface Tables {
    permissions: Permissions;
  }
}
