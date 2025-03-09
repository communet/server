import { AuthModule } from '@/application/api/auth/auth.module';
import { ConfigSchema } from '@/config/schema';
import { RedisModule } from '@/infra/nest-redis-adapter/redis.module';
import { registerTypeOrmModule } from '@/infra/nestjs-typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => ConfigSchema.parse(config),
    }),
    RedisModule,
    registerTypeOrmModule(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
