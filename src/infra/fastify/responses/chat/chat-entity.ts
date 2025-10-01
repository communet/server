import { ChatEntity } from '../../../../core/entities';
import { Response } from '../types';
import { ChatResponse } from './types';

export const mapChatEntity = ({
  id,
  name,
  channelId,
}: ChatEntity): Response<ChatResponse> => ({
  error: false,
  data: { id, name, channelId },
});
