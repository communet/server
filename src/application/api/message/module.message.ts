import { Module } from '@nestjs/common';
import { MessageController } from '@/application/api/message/controller.message';
import {
  ChannelMembersRepositoryProvider,
  ChannelsRepositoryProvider,
  ChatsRepositoryProvider,
  MessagesRepositoryProvider,
} from '@/infra/nest-providers/repository.providers';
import {
  NestJsCreateMessageCommandHandlerProvider,
  NestJsDeleteMessageByIdCommandHandlerProvider,
  NestJsUpdateMessageByIdCommandHandlerProvider,
} from '@/infra/nest-providers/command.providers';
import {
  NestJsGetAllMessagesQueryHandlerProvider,
  NestJsGetMessageByIdQueryHandlerProvider,
} from '@/infra/nest-providers/query.providers';
import { MessageMixinProvider } from '@/infra/nest-providers/mixin.providers';
import { WsGateway } from '@/application/api/ws/ws.gateway';

@Module({
  controllers: [MessageController],
  providers: [
    ChannelsRepositoryProvider,
    ChannelMembersRepositoryProvider,
    ChatsRepositoryProvider,
    MessagesRepositoryProvider,
    MessageMixinProvider,
    WsGateway,
    NestJsCreateMessageCommandHandlerProvider,
    NestJsGetAllMessagesQueryHandlerProvider,
    NestJsGetMessageByIdQueryHandlerProvider,
    NestJsUpdateMessageByIdCommandHandlerProvider,
    NestJsDeleteMessageByIdCommandHandlerProvider,
  ],
})
export class MessageModule {}
