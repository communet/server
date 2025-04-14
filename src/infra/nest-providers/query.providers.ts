import { Channel } from '@/domain/entities/channels.entities';
import { IQueryHandler } from '@/logic/queries/base.queries';
import {
  GetChannelByIdQuery,
  GetChannelByIdQueryHandler,
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
