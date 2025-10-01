import { Knex } from 'knex';
import { ChannelEntity } from '../../../../core/entities';
import {
  LoadChannelByIdPort,
  LoadChannelsByUserIdPort,
  RemoveChannelPort,
  SaveChannelPort,
} from '../../../../core/ports';

export class ChannelRepository
  implements
    SaveChannelPort,
    LoadChannelsByUserIdPort,
    RemoveChannelPort,
    LoadChannelByIdPort
{
  constructor(private readonly knex: Knex) {}

  async save(channel: ChannelEntity): Promise<ChannelEntity> {
    await this.knex('channels')
      .insert({
        id: channel.id,
        name: channel.name,
        creator_id: channel.creatorId,
      })
      .onConflict(['id'])
      .merge();

    return channel;
  }

  // FIXME: include channels in which user is a participant
  async loadByUserId(userId: string): Promise<ChannelEntity[]> {
    const channels = await this.knex('channels')
      .where({ creator_id: userId })
      .select('*');

    return channels.map(
      (channel) =>
        new ChannelEntity(channel.id, channel.name, channel.creator_id),
    );
  }

  async loadById(id: string): Promise<ChannelEntity | null> {
    const channel = await this.knex('channels').where({ id }).first();

    return channel
      ? new ChannelEntity(channel.id, channel.name, channel.creator_id)
      : null;
  }

  async remove(id: string): Promise<string | undefined> {
    const result = await this.knex('channels').where({ id }).del('id');

    return result.at(0)?.id;
  }
}
