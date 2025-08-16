import { Knex } from 'knex';
import { ChatEntity } from '../../../../core/entities';
import {
  LoadChatsByChannelIdPort,
  RemoveChatPort,
  SaveChatPort,
} from '../../../../core/ports';

export class ChatRepository
  implements SaveChatPort, RemoveChatPort, LoadChatsByChannelIdPort
{
  constructor(private readonly knex: Knex) {}

  async save(chat: ChatEntity): Promise<ChatEntity> {
    await this.knex('chats')
      .insert({
        id: chat.id,
        name: chat.name,
        channel_id: chat.channelId,
      })
      .onConflict(['id'])
      .merge();

    return chat;
  }

  async remove(id: string): Promise<void> {
    await this.knex('chats').where({ id }).del();
  }

  async loadByChannelId(channelId: string): Promise<ChatEntity[]> {
    const chats = await this.knex('chats').where({ channel_id: channelId });

    return chats.map((chat) => new ChatEntity(chat.id, chat.name, channelId));
  }
}
