import { Module } from '@nestjs/common';
import { ChatsController } from '@/application/api/chats/controller.chats';
import {
  NestJsCreateChatCommandHandlerProvider,
  NestJsDeleteChatCommandHandlerProvider,
  NestJsUpdateChatCommandHandlerProvider,
} from '@/infra/nest-providers/command.providers';
import {
  ChannelMembersRepositoryProvider,
  ChannelsRepositoryProvider,
  ChatsRepositoryProvider,
} from '@/infra/nest-providers/repository.providers';
import {
  NestJsGetChatByIdQueryHandlerProvider,
  NestJsGetChatsQueryHandlerProvider,
} from '@/infra/nest-providers/query.providers';
import { ChatMixinProvider } from '@/infra/nest-providers/mixin.providers';

@Module({
  controllers: [ChatsController],
  providers: [
    ChannelMembersRepositoryProvider,
    ChannelsRepositoryProvider,
    ChatsRepositoryProvider,
    ChatMixinProvider,
    NestJsGetChatsQueryHandlerProvider,
    NestJsGetChatByIdQueryHandlerProvider,
    NestJsCreateChatCommandHandlerProvider,
    NestJsUpdateChatCommandHandlerProvider,
    NestJsDeleteChatCommandHandlerProvider,
  ],
})
export class ChatsModule {}
