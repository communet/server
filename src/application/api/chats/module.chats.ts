import { Module } from '@nestjs/common';
import { ChatsController } from '@/application/api/chats/controller.chats';
import { NestJsCreateChatCommandHandlerProvider } from '@/infra/nest-providers/command.providers';
import {
  ChannelMembersRepositoryProvider,
  ChannelsRepositoryProvider,
  ChatsRepositoryProvider,
} from '@/infra/nest-providers/repository.providers';

@Module({
  controllers: [ChatsController],
  providers: [
    ChannelMembersRepositoryProvider,
    ChannelsRepositoryProvider,
    ChatsRepositoryProvider,
    NestJsCreateChatCommandHandlerProvider,
  ],
})
export class ChatsModule {}
