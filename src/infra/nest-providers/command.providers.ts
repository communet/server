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
  DeleteChannelCommand,
  DeleteChannelCommandHandler,
  UpdateChannelCommand,
  UpdateChannelCommandHandler,
} from '@/logic/commands/channels.command';
import { Channel } from '@/domain/entities/channels.entities';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import {
  ConnectToChannelCommand,
  ConnectToChannelCommandHandler,
  DisconnectFromChannelCommand,
  DisconnectFromChannelCommandHandler,
} from '@/logic/commands/members.command';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import {
  CreateChatCommand,
  CreateChatCommandHandler,
  DeleteChatCommand,
  DeleteChatCommandHandler,
  UpdateChatCommand,
  UpdateChatCommandHandler,
} from '@/logic/commands/chats.command';
import { Chat } from '@/domain/entities/chat.entities';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import {
  CreateMessageCommand,
  CreateMessageCommandHandler,
  DeleteMessageByIdCommand,
  DeleteMessageByIdCommandHandler,
} from '@/logic/commands/messages.command';
import { Message } from '@/domain/entities/message.entities';
import { IMessagesRepository } from '@/infra/database/repositories/message.repositories';

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
    membersRepository: IChannelMembersRepository,
    fileService: IFileService,
    transactionManager: ITransactionManager,
  ) => {
    return new CreateChannelCommandHandler(
      channelsRepository,
      membersRepository,
      fileService,
      transactionManager,
    );
  },
  inject: [
    IChannelsRepository,
    IChannelMembersRepository,
    IFileService,
    ITransactionManager,
  ],
};

export abstract class IUpdateChannelCommandHandler extends ICommandHandler<
  UpdateChannelCommand,
  Channel
> {}

export const NestJsUpdateChannelCommandHandlerProvider: Provider = {
  provide: IUpdateChannelCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    fileService: IFileService,
  ) => {
    return new UpdateChannelCommandHandler(channelsRepository, fileService);
  },
  inject: [IChannelsRepository, IFileService],
};

export abstract class IDeleteChannelCommandHandler extends ICommandHandler<
  DeleteChannelCommand,
  undefined
> {}

export const NestJsDeleteChannelCommandHandlerProvider: Provider = {
  provide: IDeleteChannelCommandHandler,
  useFactory: (channelsRepository: IChannelsRepository) => {
    return new DeleteChannelCommandHandler(channelsRepository);
  },
  inject: [IChannelsRepository],
};

export abstract class IConnectToChannelCommandHandler extends ICommandHandler<
  ConnectToChannelCommand,
  undefined
> {}

export const NestJsConnectToChannelCommandHandlerProvider: Provider = {
  provide: IConnectToChannelCommandHandler,
  useFactory: (
    channelRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
  ) => {
    return new ConnectToChannelCommandHandler(
      channelRepository,
      membersRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository],
};

export abstract class IDisconnectFromChannelCommandHandler extends ICommandHandler<
  DisconnectFromChannelCommand,
  undefined
> {}

export const NestJsDisconnectFromChannelCommandHandlerProvider: Provider = {
  provide: IDisconnectFromChannelCommandHandler,
  useFactory: (
    channelRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
  ) => {
    return new DisconnectFromChannelCommandHandler(
      channelRepository,
      membersRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository],
};

export abstract class ICreateChatCommandHandler extends ICommandHandler<
  CreateChatCommand,
  Chat
> {}

export const NestJsCreateChatCommandHandlerProvider: Provider = {
  provide: ICreateChatCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
  ) => {
    return new CreateChatCommandHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository, IChatsRepository],
};

export abstract class IDeleteChatCommandHandler extends ICommandHandler<
  DeleteChatCommand,
  undefined
> {}

export const NestJsDeleteChatCommandHandlerProvider: Provider = {
  provide: IDeleteChatCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
  ) => {
    return new DeleteChatCommandHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository, IChatsRepository],
};

export abstract class IUpdateChatCommandHandler extends ICommandHandler<
  UpdateChatCommand,
  Chat
> {}

export const NestJsUpdateChatCommandHandlerProvider: Provider = {
  provide: IUpdateChatCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
  ) => {
    return new UpdateChatCommandHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository, IChatsRepository],
};

export abstract class ICreateMessageCommandHandler extends ICommandHandler<
  CreateMessageCommand,
  Message
> {}

export const NestJsCreateMessageCommandHandlerProvider: Provider = {
  provide: ICreateMessageCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
    messagesRepository: IMessagesRepository,
  ) => {
    return new CreateMessageCommandHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
      messagesRepository,
    );
  },
  inject: [
    IChannelsRepository,
    IChannelMembersRepository,
    IChatsRepository,
    IMessagesRepository,
  ],
};

export abstract class IDeleteMessageByIdCommandHandler extends ICommandHandler<
  DeleteMessageByIdCommand,
  undefined
> {}

export const NestJsDeleteMessageByIdCommandHandlerProvider: Provider = {
  provide: IDeleteMessageByIdCommandHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
    messagesRepository: IMessagesRepository,
  ) => {
    return new DeleteMessageByIdCommandHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
      messagesRepository,
    );
  },
  inject: [
    IChannelsRepository,
    IChannelMembersRepository,
    IChatsRepository,
    IMessagesRepository,
  ],
};
