import { Channel } from '@/domain/entities/channels.entities';
import { ChannelName } from '@/domain/values/channels.values';
import { ChannelsModel } from '@/infra/database/models/channel.model';
import { convertProfileModelToEntity } from '@/infra/database/converters/user.converters';

export function convertChannelModelToEntity(model: ChannelsModel): Channel {
  const channelName = new ChannelName(model.name);
  const members = model.members ?? [];
  return new Channel(
    channelName,
    model.description,
    model.avatar_url,
    members.map((member) => {
      return convertProfileModelToEntity(member.profile);
    }),
    model.is_deleted,
    model.created_at,
    model.updated_at,
    model.id,
  );
}
