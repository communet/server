import { Repository } from 'typeorm';
import { MessageModel } from '@/infra/database/models/message.model';
import { Message } from '@/domain/entities/message.entities';

export abstract class IMessagesRepository {
  abstract create(model: Message): Promise<MessageModel>;
}

export class MessageRepository extends IMessagesRepository {
  constructor(protected readonly messagesRepository: Repository<MessageModel>) {
    super();
  }

  async create(message: Message): Promise<MessageModel> {
    const messageModel = {
      id: String(message.oid),
      text: message.content,
      author: { id: String(message.author.oid) },
      chat: { id: String(message.chat.oid) },
    };

    const newMessage = this.messagesRepository.create(messageModel);
    return await this.messagesRepository.save(newMessage);
  }
}
