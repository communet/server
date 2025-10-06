import { Knex } from 'knex';
import { MessageEntity } from '../../../../core/entities';
import {
  LoadByChatIdPort,
  LoadMessageByIdPort,
  RemoveMessagePort,
  SaveMessagePort,
} from '../../../../core/ports';

export class MessageRepository
  implements
    LoadByChatIdPort,
    RemoveMessagePort,
    SaveMessagePort,
    LoadMessageByIdPort
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
          content: message.content,
          senderId: message.sender_id,
          chatId: message.chat_id,
          createdAt: message.created_at,
        }),
    );
  }

  async load(id: string): Promise<MessageEntity | null> {
    const message = await this.knex('messages').where({ id }).first();

    return message
      ? new MessageEntity({
          id: message.id,
          content: message.content,
          senderId: message.sender_id,
          chatId: message.chat_id,
          createdAt: message.created_at,
        })
      : null;
  }

  async remove(id: string): Promise<string | undefined> {
    const result = await this.knex('messages').where({ id }).del('id');

    return result.at(0)?.id;
  }

  async save(message: MessageEntity): Promise<MessageEntity> {
    await this.knex('messages')
      .insert({
        id: message.id,
        content: message.content,
        sender_id: message.senderId,
        chat_id: message.chatId,
        created_at: message.createdAt,
      })
      .onConflict(['id'])
      .merge();

    return message;
  }
}
