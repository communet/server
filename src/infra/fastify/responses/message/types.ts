import { MessageEntity } from '../../../../core/entities';

export type MessageResponse = {
  id: MessageEntity['id'];
  body: MessageEntity['body'];
  chatId: MessageEntity['chatId'];
  senderId: MessageEntity['senderId'];
  createdAt: MessageEntity['createdAt'];
};
