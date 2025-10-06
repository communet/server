import { MessageEntity } from '../../../../core/entities';

export type MessageResponse = {
  id: MessageEntity['id'];
  content: MessageEntity['content'];
  chatId: MessageEntity['chatId'];
  senderId: MessageEntity['senderId'];
  createdAt: MessageEntity['createdAt'];
};
