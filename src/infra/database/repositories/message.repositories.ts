import { Repository } from 'typeorm';
import { MessageModel } from '@/infra/database/models/message.model';
import { Message } from '@/domain/entities/message.entities';

export abstract class IMessagesRepository {
  abstract findById(messageId: string): Promise<MessageModel | null>;
  abstract create(model: Message): Promise<MessageModel>;
}

export class MessageRepository extends IMessagesRepository {
  constructor(protected readonly messagesRepository: Repository<MessageModel>) {
    super();
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
      chat: { id: String(message.chat.oid) },
      reply_to: message.replyTo,
    };

    const newMessage = this.messagesRepository.create(messageModel);
    return await this.messagesRepository.save(newMessage);
  }
}
