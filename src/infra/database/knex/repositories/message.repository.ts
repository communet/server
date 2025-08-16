import { Knex } from 'knex';
import { MessageEntity } from '../../../../core/entities';
import {
  LoadByChatIdPort,
  RemoveMessagePort,
  SaveMessagePort,
} from '../../../../core/ports';

export class MessageRepository
  implements LoadByChatIdPort, RemoveMessagePort, SaveMessagePort
{
  constructor(private readonly knex: Knex) {}

  async loadByChatId(chatId: string): Promise<MessageEntity[]> {
    const messages = await this.knex('messages')
      .where({ chat_id: chatId })
      .orderBy('created_at', 'asc');

    return messages.map(
      (message) =>
        new MessageEntity({
          id: message.id,
          body: message.body,
          senderId: message.sender_id,
          chatId: message.chat_id,
          createdAt: message.created_at,
        }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.knex('messages').where({ id }).del();
  }

  async save(message: MessageEntity): Promise<MessageEntity> {
    await this.knex('messages')
      .insert({
        id: message.id,
        body: message.body,
        sender_id: message.senderId,
        chat_id: message.chatId,
        created_at: message.createdAt,
      })
      .onConflict(['id'])
      .merge();

    return message;
  }
}
