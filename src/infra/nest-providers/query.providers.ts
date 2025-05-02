import { Channel } from '@/domain/entities/channels.entities';
import { IQueryHandler } from '@/logic/queries/base.queries';
import {
  GetChannelByIdQuery,
  GetChannelByIdQueryHandler,
  GetChannelsQuery,
  GetChannelsQueryHandler,
} from '@/logic/queries/channels.queries';
import { Provider } from '@nestjs/common';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import {
  GetChatByIdQuery,
  GetChatByIdQueryHandler,
  GetChatsQuery,
  GetChatsQueryHandler,
} from '@/logic/queries/chats.queries';
import { Chat } from '@/domain/entities/chat.entities';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';

export abstract class IGetChannelByIdQueryHandler extends IQueryHandler<
  GetChannelByIdQuery,
  Channel
> {}

export const NestJsGetChannelByIdQueryHandlerProvider: Provider = {
  provide: IGetChannelByIdQueryHandler,
  useFactory: (channelsRepository: IChannelsRepository) => {
    return new GetChannelByIdQueryHandler(channelsRepository);
  },
  inject: [IChannelsRepository],
};

export abstract class IGetChannelsQueryHandler extends IQueryHandler<
  GetChannelsQuery,
  Channel[]
> {}

export const NestJsGetChannelsQueryHandlerProvider: Provider = {
  provide: IGetChannelsQueryHandler,
  useFactory: (channelsRepository: IChannelsRepository) => {
    return new GetChannelsQueryHandler(channelsRepository);
  },
  inject: [IChannelsRepository],
};

export abstract class IGetChatByIdQueryHandler extends IQueryHandler<
  GetChatByIdQuery,
  Chat
> {}

export const NestJsGetChatByIdQueryHandlerProvider: Provider = {
  provide: IGetChatByIdQueryHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
  ) => {
    return new GetChatByIdQueryHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository, IChatsRepository],
};

export abstract class IGetChatsQueryHandler extends IQueryHandler<
  GetChatsQuery,
  Chat[]
> {}

export const NestJsGetChatsQueryHandlerProvider: Provider = {
  provide: IGetChatsQueryHandler,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
  ) => {
    return new GetChatsQueryHandler(
      channelsRepository,
      membersRepository,
      chatsRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository, IChatsRepository],
};
