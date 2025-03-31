import { Profile } from '@/domain/entities/user.entities';
import {
  LoginCommand,
  LoginCommandHandler,
  RefreshCommand,
  RefreshCommandHandler,
  RegisterCommand,
  RegisterCommandHandler,
} from '@/logic/commands/auth.command';
import {
  UpdateCurrentUserCommand,
  UpdateCurrentUserCommandHandler,
} from '@/logic/commands/users.command';
import { ICommandHandler } from '@/logic/commands/base.command';
import { Provider } from '@nestjs/common';
import { ICredentialsRepository } from '@/infra/database/repositories/credentials.repositories';
import { AuthTokens } from '@/domain/entities/auth.entities';
import { IJWTService } from '@/infra/services/jwt.services';
import { ITransactionManager } from '@/infra/database/repositories/transaction.repositories';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import { IRedisProvider } from '@/infra/nest-providers/service.providers';
import { IFileService } from '@/infra/services/minio.services';
import {
  CreateChannelCommand,
  CreateChannelCommandHandler,
} from '@/logic/commands/channels.command';
import { Channel } from '@/domain/entities/channels.entities';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';

export abstract class IRegisterCommandHandler extends ICommandHandler<
  RegisterCommand,
  Profile
> {}

export const NestJsRegisterCommandHandlerProvider: Provider = {
  provide: IRegisterCommandHandler,
  useFactory: (
    credentialsRepository: ICredentialsRepository,
    profileRepository: IProfileRepository,
    transactionManager: ITransactionManager,
  ) => {
    return new RegisterCommandHandler(
      credentialsRepository,
      profileRepository,
      transactionManager,
    );
  },
  inject: [ICredentialsRepository, IProfileRepository, ITransactionManager],
};

export abstract class ILoginCommandHandler extends ICommandHandler<
  LoginCommand,
  AuthTokens
> {}

export const NestJsLoginCommandHandlerProvider: Provider = {
  provide: ILoginCommandHandler,
  useFactory: (
    credentialsRepository: ICredentialsRepository,
    jwtService: IJWTService,
    redisService: IRedisProvider,
  ) => {
    return new LoginCommandHandler(
      credentialsRepository,
      jwtService,
      redisService,
    );
  },
  inject: [ICredentialsRepository, IJWTService, IRedisProvider],
};

export abstract class IRefreshCommandHandler extends ICommandHandler<
  RefreshCommand,
  AuthTokens
> {}

export const NestJsRefreshCommandHandlerProvider: Provider = {
  provide: IRefreshCommandHandler,
  useFactory: (jwtService: IJWTService, redisService: IRedisProvider) => {
    return new RefreshCommandHandler(jwtService, redisService);
  },
  inject: [IJWTService, IRedisProvider],
};

export abstract class IUpdateCurrentUserCommandHandler extends ICommandHandler<
  UpdateCurrentUserCommand,
  Profile
> {}

export const NestJsUpdateCurrentUserCommandHandlerProvider: Provider = {
  provide: IUpdateCurrentUserCommandHandler,
  useFactory: (
    profileRepository: IProfileRepository,
    fileService: IFileService,
  ) => {
    return new UpdateCurrentUserCommandHandler(profileRepository, fileService);
  },
  inject: [IProfileRepository, IFileService],
};

export abstract class ICreateChannelCommandHandler extends ICommandHandler<
  CreateChannelCommand,
  Channel
> {}

export const NestJsCreateChannelCommandHandlerProvider: Provider = {
  provide: ICreateChannelCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    fileService: IFileService,
  ) => {
    return new CreateChannelCommandHandler(channelsRepository, fileService);
  },
  inject: [IChannelsRepository, IFileService],
};
