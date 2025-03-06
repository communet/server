import { AuthController } from '@/application/api/auth/auth.controller';
import { AppService } from '@/app.service';
import { Config, ConfigSchema } from '@/config/schema';
import { RedisModule } from '@/infra/nest-redis-adapter/redis.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => ConfigSchema.parse(config),
    }),
    RedisModule,
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
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
