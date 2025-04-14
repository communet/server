import { Channel } from '@/domain/entities/channels.entities';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';
import { Profile } from '@/domain/entities/user.entities';

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

export class GetChannelsQuery extends BaseQuery {
  constructor(
    public readonly limit: number,
    public readonly offset: number,
    public readonly profile: Profile,
  ) {
    super();
  }
}

export class GetChannelsQueryHandler extends IQueryHandler<
  GetChannelsQuery,
  [Array<Channel>, number]
> {
  constructor(protected readonly channelsRepository: IChannelsRepository) {
    super();
  }

  async execute(query: GetChannelsQuery): Promise<[Array<Channel>, number]> {
    const [channelsModels, count] =
      await this.channelsRepository.findAllByProfileId(
        query.limit,
        query.offset,
      );
    const channels: Array<Channel> = [];
    for (const model of channelsModels) {
      const channel = convertChannelModelToEntity(model);
      channels.push(channel);
    }
    return [channels, count];
  }
}
