import { ChannelEntity } from '../../../../core/entities';

export type ChannelResponse = {
  id: ChannelEntity['id'];
  name: ChannelEntity['name'];
  creatorId: ChannelEntity['creatorId'];
};
