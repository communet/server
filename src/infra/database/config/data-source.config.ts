// src/data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Config } from '@/config/schema';

config();

const configService = new ConfigService<Config>();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['src/infra/database/models/**/*.model.{ts,js}'],
  migrations: ['src/infra/database/migrations/*.{ts,js}'],
});
