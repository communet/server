import { ChannelEntity } from '../../../../core/entities';
import { Response } from '../types';
import { ChannelResponse } from './types';

export const mapChannelEntity = (
  channel: ChannelEntity,
): Response<ChannelResponse> => ({
  error: false,
  data: {
    id: channel.id,
    name: channel.name,
    creatorId: channel.creatorId,
  },
});
