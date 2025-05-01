import { Chat } from '@/domain/entities/chat.entities';
import { ChatModel, ChatType } from '@/infra/database/models/chat.model';
import { Repository } from 'typeorm';

export abstract class IChatsRepository {
  abstract create(chat: Chat): Promise<ChatModel>;
}

export class ChatsRepository extends IChatsRepository {
  constructor(protected readonly chatsRepository: Repository<ChatModel>) {
    super();
  }

  async create(chat: Chat): Promise<ChatModel> {
    const chatModel = {
      id: String(chat.oid),
      name: chat.name,
      type: chat.type as ChatType,
      channel: { id: String(chat.channel.oid) },
    };

    const newChat = this.chatsRepository.create(chatModel);
    const savedChat = await this.chatsRepository.save(newChat);
    const createdChat = await this.chatsRepository.findOne({
      where: { id: savedChat.id },
      relations: ['channel'],
    });
    return createdChat!;
  }
}
