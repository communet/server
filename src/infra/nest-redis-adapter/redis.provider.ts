import { Config } from '@/config/schema';
import { RedisWrapper } from '@/infra/redis-wrapper/redis.wrapper';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';

export abstract class IRedisProvider {
  abstract connection: RedisClientType;
}

export const NestJsRedisProvider: Provider = {
  provide: IRedisProvider,
  useFactory: async (
    configService: ConfigService<Config>,
  ): Promise<IRedisProvider> => {
    const redisWrapper = new RedisWrapper(configService.get('REDIS_URL')!);

    await redisWrapper.connect();

    return redisWrapper;
  },
  inject: [ConfigService],
};
