import { ChatEntity } from '../../../../core/entities';

export type ChatResponse = {
  id: ChatEntity['id'];
  name: ChatEntity['name'];
  channelId: ChatEntity['channelId'];
};
