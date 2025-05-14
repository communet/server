import { Message } from '@/domain/entities/message.entities';
import { MessageContent } from '@/domain/values/message.values';
import { MessageModel } from '@/infra/database/models/message.model';
import { convertProfileModelToEntity } from '@/infra/database/converters/user.converters';

export function convertMessageModelToEntity(model: MessageModel): Message {
  return new Message(
    new MessageContent(model.text),
    convertProfileModelToEntity(model.author),
    model.reply_to ?? undefined,
    model.chat.id,
    model.created_at,
    model.updated_at,
    model.id,
  );
}
