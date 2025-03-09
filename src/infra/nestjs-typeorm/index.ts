import { Config } from '@/config/schema';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const registerTypeOrmModule = (): DynamicModule =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService<Config>) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: ['src/infra/database/models/**/*.models.{ts,js}'],
      migrations: ['src/infra/database/migrations/*.{ts,js}'],
    }),
  });
