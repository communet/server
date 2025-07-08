import * as dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

const AppConfig = process.env;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: AppConfig.DB_NAME,
      user: AppConfig.DB_USER,
      password: AppConfig.DB_PASSWORD,
      host: AppConfig.DB_HOST,
      port: Number(AppConfig.DB_PORT),
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/infra/database/knex/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/infra/database/knex/seeds/dev',
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: AppConfig.DB_NAME,
      user: AppConfig.DB_USER,
      password: AppConfig.DB_PASSWORD,
      host: AppConfig.DB_HOST,
      port: Number(AppConfig.DB_PORT),
    },
    migrations: {
      tableName: 'migrations',
      // FIXME: Подкорректировать директорию после билда (если будет необходимо)
      directory: './src/infra/database/knex/migrations',
    },
    seeds: {
      // FIXME: Подкорректировать директорию после билда (если будет необходимо)
      directory: './src/infra/database/knex/seeds/production',
    },
  },
};

module.exports = config;
