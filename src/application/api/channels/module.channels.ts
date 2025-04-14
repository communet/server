import { Module } from '@nestjs/common';
import { ChannelsController } from '@/application/api/channels/controller.channels';
import { ChannelsRepositoryProvider } from '@/infra/nest-providers/repository.providers';
import {
  NestJsCreateChannelCommandHandlerProvider,
  NestJsDeleteChannelCommandHandlerProvider,
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
    FileServiceProvider,
    NestJsCreateChannelCommandHandlerProvider,
    NestJsUpdateChannelCommandHandlerProvider,
    NestJsDeleteChannelCommandHandlerProvider,
    NestJsGetChannelByIdQueryHandlerProvider,
    NestJsGetChannelsQueryHandlerProvider,
  ],
})
export class ChannelsModule {}
