import { Channel } from '@/domain/entities/channels.entities';
import { EntityManager, Repository } from 'typeorm';
import { ChannelsModel } from '@/infra/database/models/channel.model';
import { Profile } from '@/domain/entities/user.entities';

export abstract class IChannelsRepository {
  abstract findAllByProfileId(
    profile: Profile,
    limit: number,
    offset: number,
  ): Promise<[Array<ChannelsModel>, number]>;

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

  async findAllByProfileId(
    profile: Profile,
    limit: number,
    offset: number,
  ): Promise<[Array<ChannelsModel>, number]> {
    const channelsCount = await this.channelsRepository.count({
      where: {
        is_deleted: false,
        members: {
          profile: { id: String(profile.oid) },
          is_connected: true,
        },
      },
    });

    const channels = await this.channelsRepository.find({
      where: {
        is_deleted: false,
        members: {
          profile: { id: String(profile.oid) },
          is_connected: true,
        },
      },
      skip: offset,
      take: limit,
    });

    return [channels, channelsCount];
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
