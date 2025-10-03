import { MessageEntity } from '../../../../core/entities';
import { Response } from '../types';
import { MessageResponse } from './types';

export const mapMessageEntity = (
  message: MessageEntity,
): Response<MessageResponse> => ({
  error: false,
  data: {
    id: message.id,
    body: message.body,
    chatId: message.chatId,
    senderId: message.senderId,
    createdAt: message.createdAt,
  },
});
