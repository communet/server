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
import {
  GetUserByIdQuery,
  GetUserByIdQueryHandler,
} from '@/logic/queries/users.queries';
import { Profile } from '@/domain/entities/user.entities';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import {
  GetAllMessagesQuery,
  GetAllMessagesQueryHandler,
  GetMessageByIdQuery,
  GetMessageByIdQueryHandler,
} from '@/logic/queries/message.queries';
import { Message } from '@/domain/entities/message.entities';
import { IMessagesRepository } from '@/infra/database/repositories/message.repositories';
import { IMessageMixin } from '@/logic/mixin/message.mixin';
import { IChatMixin } from '@/logic/mixin/chat.mixin';

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
  useFactory: (chatMixin: IChatMixin, chatsRepository: IChatsRepository) => {
    return new GetChatByIdQueryHandler(chatMixin, chatsRepository);
  },
  inject: [IChatMixin, IChatsRepository],
};

export abstract class IGetChatsQueryHandler extends IQueryHandler<
  GetChatsQuery,
  Chat[]
> {}

export const NestJsGetChatsQueryHandlerProvider: Provider = {
  provide: IGetChatsQueryHandler,
  useFactory: (chatMixin: IChatMixin, chatsRepository: IChatsRepository) => {
    return new GetChatsQueryHandler(chatMixin, chatsRepository);
  },
  inject: [IChatMixin, IChatsRepository],
};

export abstract class IGetUserByIdQueryHandler extends IQueryHandler<
  GetUserByIdQuery,
  Profile
> {}

export const NestJsGetUserByIdQueryHandlerProvider: Provider = {
  provide: IGetUserByIdQueryHandler,
  useFactory: (profileRepository: IProfileRepository) => {
    return new GetUserByIdQueryHandler(profileRepository);
  },
  inject: [IProfileRepository],
};

export abstract class IGetAllMessagesQueryHandler extends IQueryHandler<
  GetAllMessagesQuery,
  Message[]
> {}

export const NestJsGetAllMessagesQueryHandlerProvider: Provider = {
  provide: IGetAllMessagesQueryHandler,
  useFactory: (
    messageMixin: IMessageMixin,
    messagesRepository: IMessagesRepository,
  ) => {
    return new GetAllMessagesQueryHandler(messageMixin, messagesRepository);
  },
  inject: [IMessageMixin, IMessagesRepository],
};

export abstract class IGetMessageByIdQueryHandler extends IQueryHandler<
  GetMessageByIdQuery,
  Message
> {}

export const NestJsGetMessageByIdQueryHandlerProvider: Provider = {
  provide: IGetMessageByIdQueryHandler,
  useFactory: (
    messageMixin: IMessageMixin,
    messagesRepository: IMessagesRepository,
  ) => {
    return new GetMessageByIdQueryHandler(messageMixin, messagesRepository);
  },
  inject: [IMessageMixin, IMessagesRepository],
};
