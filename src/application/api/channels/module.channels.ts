import { Module } from '@nestjs/common';
import { ChannelsController } from '@/application/api/channels/controller.channels';
import {
  ChannelMembersRepositoryProvider,
  ChannelsRepositoryProvider,
  TransactionManagerProvider,
} from '@/infra/nest-providers/repository.providers';
import {
  NestJsConnectToChannelCommandHandlerProvider,
  NestJsCreateChannelCommandHandlerProvider,
  NestJsDeleteChannelCommandHandlerProvider,
  NestJsDisconnectFromChannelCommandHandlerProvider,
  NestJsUpdateChannelCommandHandlerProvider,
} from '@/infra/nest-providers/command.providers';
import { FileServiceProvider } from '@/infra/nest-providers/service.providers';
import {
  NestJsGetChannelByIdQueryHandlerProvider,
  NestJsGetChannelsQueryHandlerProvider,
} from '@/infra/nest-providers/query.providers';

@Module({
  controllers: [ChannelsController],
  providers: [
    ChannelsRepositoryProvider,
    ChannelMembersRepositoryProvider,
    TransactionManagerProvider,
    FileServiceProvider,
    NestJsCreateChannelCommandHandlerProvider,
    NestJsUpdateChannelCommandHandlerProvider,
    NestJsDeleteChannelCommandHandlerProvider,
    NestJsGetChannelByIdQueryHandlerProvider,
    NestJsGetChannelsQueryHandlerProvider,
    NestJsConnectToChannelCommandHandlerProvider,
    NestJsDisconnectFromChannelCommandHandlerProvider,
  ],
})
export class ChannelsModule {}
