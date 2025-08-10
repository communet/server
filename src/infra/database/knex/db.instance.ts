import knex, { Knex } from 'knex';
import config from '../../../../knexfile';
import { AppConfig } from '../../common';

let db: Knex;

switch (AppConfig.NODE_ENV) {
  case 'development':
    db = knex(config.development);
    break;
  case 'test':
    db = knex(config.test);
    break;
  case 'production':
    db = knex(config.production);
    break;
}

export { db };
