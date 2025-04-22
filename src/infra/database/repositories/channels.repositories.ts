import { Channel } from '@/domain/entities/channels.entities';
import { EntityManager, Repository } from 'typeorm';
import { ChannelsModel } from '@/infra/database/models/channel.model';

export abstract class IChannelsRepository {
  abstract findAllByProfileId(profileId: string): Promise<ChannelsModel[]>;

  abstract findById(channelId: string): Promise<ChannelsModel | null>;

  abstract create(
    channel: Channel,
    manager?: EntityManager,
  ): Promise<ChannelsModel>;

  abstract update(
    profileId: string,
    channelId: string,
    channelName?: string,
    channelDescription?: string,
    channelAvatarFileName?: string,
  ): Promise<ChannelsModel | null>;

  abstract deleteById(
    profileId: string,
    channelId: string,
  ): Promise<ChannelsModel | null>;
}

export class ChannelsRepository extends IChannelsRepository {
  constructor(
    protected readonly channelsRepository: Repository<ChannelsModel>,
  ) {
    super();
  }

  async findAllByProfileId(profileId: string): Promise<ChannelsModel[]> {
    const channels = await this.channelsRepository.find({
      where: {
        is_deleted: false,
        members: {
          profile: { id: profileId },
          is_connected: true,
        },
      },
    });

    return channels;
  }

  async findById(channelId: string): Promise<ChannelsModel | null> {
    const channel = await this.channelsRepository.findOne({
      where: {
        id: channelId,
        is_deleted: false,
      },
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

  async update(
    profileId: string,
    channelId: string,
    channelName?: string,
    channelDescription?: string,
    channelAvatarFileName?: string,
  ): Promise<ChannelsModel | null> {
    const channel = await this.channelsRepository.findOne({
      where: {
        id: channelId,
        is_deleted: false,
        members: {
          profile: { id: profileId },
          is_connected: true,
        },
      },
    });
    if (!channel) {
      return null;
    }

    if (channelName) {
      channel.name = channelName;
    }
    if (channelDescription) {
      channel.description = channelDescription;
    }
    if (channelAvatarFileName) {
      channel.avatar_url = channelAvatarFileName;
    }

    return await this.channelsRepository.save(channel);
  }

  async deleteById(
    profileId: string,
    channelId: string,
  ): Promise<ChannelsModel | null> {
    const channel = await this.channelsRepository.findOne({
      where: {
        id: channelId,
        is_deleted: false,
        members: {
          profile: { id: profileId },
          is_connected: true,
        },
      },
    });
    if (!channel) {
      return null;
    }
    channel.is_deleted = true;
    return await this.channelsRepository.save(channel);
  }
}
