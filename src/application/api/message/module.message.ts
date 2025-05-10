import { MessageController } from '@/application/api/message/controller.message';
import {
  NestJsCreateMessageCommandHandlerProvider,
  NestJsDeleteMessageByIdCommandHandlerProvider,
  NestJsUpdateMessageByIdCommandHandlerProvider,
} from '@/infra/nest-providers/command.providers';
import { MessageMixinProvider } from '@/infra/nest-providers/mixin.providers';
import {
  NestJsGetAllMessagesQueryHandlerProvider,
  NestJsGetMessageByIdQueryHandlerProvider,
} from '@/infra/nest-providers/query.providers';
import {
  ChannelMembersRepositoryProvider,
  ChannelsRepositoryProvider,
  ChatsRepositoryProvider,
  MessagesRepositoryProvider,
} from '@/infra/nest-providers/repository.providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessageController],
  providers: [
    ChannelsRepositoryProvider,
    ChannelMembersRepositoryProvider,
    ChatsRepositoryProvider,
    MessagesRepositoryProvider,
    MessageMixinProvider,
    NestJsCreateMessageCommandHandlerProvider,
    NestJsGetAllMessagesQueryHandlerProvider,
    NestJsGetMessageByIdQueryHandlerProvider,
    NestJsUpdateMessageByIdCommandHandlerProvider,
    NestJsDeleteMessageByIdCommandHandlerProvider,
  ],
})
export class MessageModule {}
