import { Channel } from '@/domain/entities/channels.entities';
import { EntityManager, Repository } from 'typeorm';
import { ChannelsModel } from '@/infra/database/models/channel.model';

export abstract class IChannelsRepository {
  abstract findById(channelId: string): Promise<ChannelsModel | null>;

  abstract create(
    channel: Channel,
    manager?: EntityManager,
  ): Promise<ChannelsModel>;

  abstract deleteById(channelId: string): Promise<ChannelsModel | null>;
}

export class ChannelsRepository extends IChannelsRepository {
  constructor(
    protected readonly credentialsRepository: Repository<ChannelsModel>,
  ) {
    super();
  }

  async findById(channelId: string): Promise<ChannelsModel | null> {
    const channel = await this.credentialsRepository.findOne({
      where: { id: channelId },
    });
    return channel;
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
      is_deleted: channel.isDeleted,
    };

    const repository =
      manager?.getRepository(ChannelsModel) ?? this.credentialsRepository;
    const newChannel = repository.create(channelModel);
    return await repository.save(newChannel);
  }

  async deleteById(channelId: string): Promise<ChannelsModel | null> {
    const existingChannel = await this.findById(channelId);
    if (!existingChannel) {
      return null;
    }

    existingChannel.is_deleted = true;
    return await this.credentialsRepository.save(existingChannel);
  }
}
