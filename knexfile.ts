import type { Knex } from 'knex';
import { AppConfig } from './src/infra/common';

const config: {
  [key in 'development' | 'test' | 'production']: Knex.Config;
} = {
  development: {
    client: 'postgresql',
    connection: {
      database: AppConfig.DB_NAME,
      user: AppConfig.DB_USER,
      password: AppConfig.DB_PASSWORD,
      host: AppConfig.DB_HOST,
      port: AppConfig.DB_PORT,
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

  test: {
    client: 'postgresql',
    connection: {
      database: `${AppConfig.DB_NAME}-test`,
      user: AppConfig.DB_USER,
      password: AppConfig.DB_PASSWORD,
      host: AppConfig.DB_HOST,
      port: AppConfig.DB_PORT,
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
      port: AppConfig.DB_PORT,
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

export default config;
