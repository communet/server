import {
  IRedisProvider,
  NestJsRedisProvider,
} from '@/infra/nest-redis-adapter/redis.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [NestJsRedisProvider],
  exports: [IRedisProvider],
})
export class RedisModule {}
