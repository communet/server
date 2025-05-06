import { Module } from '@nestjs/common';
import { MessageController } from '@/application/api/message/controller.message';
import {
  ChannelMembersRepositoryProvider,
  ChannelsRepositoryProvider,
  ChatsRepositoryProvider,
  MessagesRepositoryProvider,
} from '@/infra/nest-providers/repository.providers';
import { NestJsCreateMessageCommandHandlerProvider } from '@/infra/nest-providers/command.providers';
import { NestJsGetMessageByIdQueryHandlerProvider } from '@/infra/nest-providers/query.providers';

@Module({
  controllers: [MessageController],
  providers: [
    ChannelsRepositoryProvider,
    ChannelMembersRepositoryProvider,
    ChatsRepositoryProvider,
    MessagesRepositoryProvider,
    NestJsCreateMessageCommandHandlerProvider,
    NestJsGetMessageByIdQueryHandlerProvider,
  ],
})
export class MessageModule {}
