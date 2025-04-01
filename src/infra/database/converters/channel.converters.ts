import { Channel } from '@/domain/entities/channels.entities';
import { ChannelName } from '@/domain/values/channels.values';
import { ChannelsModel } from '@/infra/database/models/channel.model';

export function convertChannelModelToEntity(model: ChannelsModel): Channel {
  const channelName = new ChannelName(model.name);
  return new Channel(
    channelName,
    model.description,
    model.avatar_url,
    model.is_deleted,
    model.created_at,
    model.updated_at,
    model.id,
  );
}
