import { Provider } from '@nestjs/common';
import { JWTService, IJWTService } from '@/infra/services/jwt.services';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/schema';
import { JwtStrategy } from '@/application/api/auth/guards.auth';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import { RedisClientType } from 'redis';
import { RedisService } from '@/infra/services/redis.service';

export const JWTServiceProvider: Provider = {
  provide: IJWTService,
  useFactory: (configService: ConfigService<Config>) => {
    return new JWTService(
      configService.get('JWT_SECRET')!,
      configService.get('JWT_ALGORITHM')!,
      Number(configService.get('JWT_ACCESS_EXPIRES_IN_MINUTES')),
      Number(configService.get('JWT_REFRESH_EXPIRES_IN_DAYS')),
    );
  },
  inject: [ConfigService],
};

export const JwtStrategyProvider: Provider = {
  provide: JwtStrategy,
  useFactory: (
    profileRepository: IProfileRepository,
    configService: ConfigService<Config>,
  ) => {
    return new JwtStrategy(
      profileRepository,
      configService.get('JWT_SECRET')!,
      configService.get('JWT_ALGORITHM')!,
    );
  },
  inject: [IProfileRepository, ConfigService],
};

export abstract class IRedisProvider {
  abstract connection: RedisClientType;
}

export const NestJsRedisProvider: Provider = {
  provide: IRedisProvider,
  useFactory: async (
    configService: ConfigService<Config>,
  ): Promise<IRedisProvider> => {
    const redisService = new RedisService(configService.get('REDIS_URL')!);
    await redisService.connect();
    return redisService;
  },
  inject: [ConfigService],
};
