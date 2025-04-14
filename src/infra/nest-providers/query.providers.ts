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
  [Array<Channel>, number]
> {}

export const NestJsGetChannelsQueryHandlerProvider: Provider = {
  provide: IGetChannelsQueryHandler,
  useFactory: (channelsRepository: IChannelsRepository) => {
    return new GetChannelsQueryHandler(channelsRepository);
  },
  inject: [IChannelsRepository],
};
