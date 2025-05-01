import { Chat } from '@/domain/entities/chat.entities';
import { ChatName, ChatTypeVT } from '@/domain/values/chat.values';
import { ChatModel } from '@/infra/database/models/chat.model';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';

export function convertChatModelToEntity(model: ChatModel): Chat {
  const chatName = new ChatName(model.name);
  const chatType = new ChatTypeVT(model.type);

  return new Chat(
    chatName,
    chatType,
    convertChannelModelToEntity(model.channel),
    model.created_at,
    model.updated_at,
    model.id,
  );
}
