import { Channel } from '@/domain/entities/channels.entities';
import { EntityManager, Repository } from 'typeorm';
import { ChannelsModel } from '@/infra/database/models/channel.model';

export abstract class IChannelsRepository {
  // TODO: provide profile id after subsrcribe logic
  abstract findAllByProfileId(
    limit: number,
    offset: number,
  ): Promise<[Array<ChannelsModel>, number]>;

  abstract findById(channelId: string): Promise<ChannelsModel | null>;

  abstract create(
    channel: Channel,
    manager?: EntityManager,
  ): Promise<ChannelsModel>;

  abstract update(channel: Channel): Promise<ChannelsModel | null>;

  abstract deleteById(channelId: string): Promise<ChannelsModel | null>;
}

export class ChannelsRepository extends IChannelsRepository {
  constructor(
    protected readonly channelsRepository: Repository<ChannelsModel>,
  ) {
    super();
  }

  // TODO: provide profile id after subsrcribe logic
  async findAllByProfileId(
    limit: number,
    offset: number,
  ): Promise<[Array<ChannelsModel>, number]> {
    const channelsCount = await this.channelsRepository.count();
    const channels = await this.channelsRepository.find({
      skip: offset,
      take: limit,
    });
    return [channels, channelsCount];
  }

  async findById(channelId: string): Promise<ChannelsModel | null> {
    const channel = await this.channelsRepository.findOne({
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
      manager?.getRepository(ChannelsModel) ?? this.channelsRepository;
    const newChannel = repository.create(channelModel);
    return await repository.save(newChannel);
  }

  async update(channel: Channel): Promise<ChannelsModel | null> {
    const existingChannel = await this.findById(String(channel.oid));
    if (!existingChannel) {
      return null;
    }

    existingChannel.name = channel.name;
    existingChannel.description = channel.description;
    existingChannel.avatar_url = channel.avatarUrl;

    return await this.channelsRepository.save(existingChannel);
  }

  async deleteById(channelId: string): Promise<ChannelsModel | null> {
    const existingChannel = await this.findById(channelId);
    if (!existingChannel) {
      return null;
    }

    existingChannel.is_deleted = true;
    return await this.channelsRepository.save(existingChannel);
  }
}
