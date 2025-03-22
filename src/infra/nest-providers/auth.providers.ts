import { Profile } from '@/domain/entities/user.entities';
import {
  LoginCommand,
  LoginCommandHandler,
  RefreshCommand,
  RefreshCommandHandler,
  RegisterCommand,
  RegisterCommandHandler,
} from '@/logic/commands/auth.command';
import { ICommandHandler } from '@/logic/commands/base.command';
import { Provider } from '@nestjs/common';
import { CredentialsRepository } from '@/infra/database/repositories/credentials.repositories';
import { DataSource } from 'typeorm';
import { CredentialsModel } from '@/infra/database/models/credentials.model';
import { AuthTokens } from '@/domain/entities/auth.entities';
import { JWTService } from '@/infra/services/jwt.services';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/schema';
import { RedisClientType } from 'redis';
import { RedisService } from '@/infra/services/redis.service';
import {
  ITransactionManager,
  TypeOrmTransactionManager,
} from '@/infra/database/repositories/transaction.repositories';
import {
  IProfileRepository,
  ProfileRepository,
} from '@/infra/database/repositories/profile.repositories';
import { ProfileModel } from '@/infra/database/models/profile.model';

export const CredentialsRepositoryProvider: Provider = {
  provide: CredentialsRepository,
  useFactory: (dataSource: DataSource) => {
    const repository = dataSource.getRepository(CredentialsModel);
    return new CredentialsRepository(repository);
  },
  inject: [DataSource],
};

export const ProfileRepositoryProvider: Provider = {
  provide: IProfileRepository,
  useFactory: (DataSource: DataSource) => {
    const repository = DataSource.getRepository(ProfileModel);
    return new ProfileRepository(repository);
  },
  inject: [DataSource],
};

export const JWTServiceProvider: Provider = {
  provide: JWTService,
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

export const TransactionManagerProvider: Provider = {
  provide: ITransactionManager,
  useClass: TypeOrmTransactionManager,
};

export abstract class IRegisterCommandHandler extends ICommandHandler<
  RegisterCommand,
  Profile
> {}

export const NestJsRegisterCommandHandlerProvider: Provider = {
  provide: IRegisterCommandHandler,
  useFactory: (
    credentialsRepository: CredentialsRepository,
    profileRepository: IProfileRepository,
    transactionManager: ITransactionManager,
  ) => {
    return new RegisterCommandHandler(
      credentialsRepository,
      profileRepository,
      transactionManager,
    );
  },
  inject: [CredentialsRepository, IProfileRepository, ITransactionManager],
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

export abstract class ILoginCommandHandler extends ICommandHandler<
  LoginCommand,
  AuthTokens
> {}

export const NestJsLoginCommandHandlerProvider: Provider = {
  provide: ILoginCommandHandler,
  useFactory: (
    credentialsRepository: CredentialsRepository,
    jwtService: JWTService,
    redisService: IRedisProvider,
  ) => {
    return new LoginCommandHandler(
      credentialsRepository,
      jwtService,
      redisService,
    );
  },
  inject: [CredentialsRepository, JWTService, IRedisProvider],
};

export abstract class IRefreshCommandHandler extends ICommandHandler<
  RefreshCommand,
  AuthTokens
> {}

export const NestJsRefreshCommandHandlerProvider: Provider = {
  provide: IRefreshCommandHandler,
  useFactory: (jwtService: JWTService, redisService: IRedisProvider) => {
    return new RefreshCommandHandler(jwtService, redisService);
  },
  inject: [JWTService, IRedisProvider],
};
