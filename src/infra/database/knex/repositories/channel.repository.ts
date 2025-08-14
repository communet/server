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

  // TODO: implement in future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadByUserId(userId: string): Promise<ChannelEntity[]> {
    throw new Error('Method not implemented.');
  }

  async loadById(id: string): Promise<ChannelEntity | null> {
    const channel = await this.knex('channels').where({ id }).first();

    return channel
      ? new ChannelEntity(channel.id, channel.name, channel.creator_id)
      : null;
  }

  async remove(id: string): Promise<void> {
    await this.knex('channels').where({ id }).del();
  }
}
