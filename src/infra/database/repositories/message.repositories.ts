import { Repository } from 'typeorm';
import { MessageModel } from '@/infra/database/models/message.model';
import { Message } from '@/domain/entities/message.entities';

export abstract class IMessagesRepository {
  abstract findAllByChat(chatId: string): Promise<MessageModel[]>;
  abstract findById(messageId: string): Promise<MessageModel | null>;
  abstract create(message: Message): Promise<MessageModel>;
  abstract update(entity: Message): Promise<boolean>;
  abstract deleteById(messageId: string): Promise<boolean>;
}

export class MessageRepository extends IMessagesRepository {
  constructor(protected readonly messagesRepository: Repository<MessageModel>) {
    super();
  }

  async findAllByChat(chatId: string): Promise<MessageModel[]> {
    return await this.messagesRepository.find({
      where: {
        chat: {
          id: chatId,
        },
        is_deleted: false,
      },
      relations: ['chat', 'author', 'author.credentials'],
    });
  }

  async findById(messageId: string): Promise<MessageModel | null> {
    return await this.messagesRepository.findOne({
      where: {
        id: messageId,
        is_deleted: false,
      },
      relations: ['chat', 'author', 'author.credentials'],
    });
  }

  async create(message: Message): Promise<MessageModel> {
    const messageModel = {
      id: String(message.oid),
      text: message.content,
      author: { id: String(message.author.oid) },
      chat: { id: message.chatId },
      reply_to: message.replyTo,
    };

    const newMessage = this.messagesRepository.create(messageModel);
    return await this.messagesRepository.save(newMessage);
  }

  async update(entity: Message): Promise<boolean> {
    const message = await this.findById(String(entity.oid));
    if (!message) {
      return false;
    }
    message.text = entity.content;
    await this.messagesRepository.save(message);
    return true;
  }

  async deleteById(messageId: string): Promise<boolean> {
    const message = await this.findById(messageId);
    if (!message) {
      return false;
    }
    message.is_deleted = true;
    await this.messagesRepository.save(message);
    return true;
  }
}
