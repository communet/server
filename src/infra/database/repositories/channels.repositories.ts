import { Channel } from '@/domain/entities/channels.entities';
import { EntityManager, Repository } from 'typeorm';
import { ChannelsModel } from '@/infra/database/models/channel.model';

export abstract class IChannelsRepository {
  abstract create(
    channel: Channel,
    manager?: EntityManager,
  ): Promise<ChannelsModel>;
}

export class ChannelsRepository extends IChannelsRepository {
  constructor(
    protected readonly credentialsRepository: Repository<ChannelsModel>,
  ) {
    super();
  }

  async create(
    channel: Channel,
    manager?: EntityManager,
  ): Promise<ChannelsModel> {
    const channelModel = {
      id: String(channel.oid),
      name: channel.name,
      description: channel.description,
      avatar_url: channel.avatarUrl,
    };

    const repository =
      manager?.getRepository(ChannelsModel) ?? this.credentialsRepository;
    const newChannel = repository.create(channelModel);
    return await repository.save(newChannel);
  }
}
