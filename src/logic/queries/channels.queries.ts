import { Channel } from '@/domain/entities/channels.entities';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';

export class GetChannelByIdQuery extends BaseQuery {
  constructor(public readonly channelId: string) {
    super();
  }
}

export class GetChannelByIdQueryHandler extends IQueryHandler<
  GetChannelByIdQuery,
  Channel
> {
  constructor(protected readonly channelsRepository: IChannelsRepository) {
    super();
  }

  async execute(query: GetChannelByIdQuery): Promise<Channel> {
    const channelModel = await this.channelsRepository.findById(
      query.channelId,
    );
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        `Channel with ${query.channelId} id does not exist`,
      );
    }
    const channel = convertChannelModelToEntity(channelModel);
    return channel;
  }
}
