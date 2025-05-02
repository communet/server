import { Chat } from '@/domain/entities/chat.entities';
import { ChatModel, ChatType } from '@/infra/database/models/chat.model';
import { Repository } from 'typeorm';

export abstract class IChatsRepository {
  abstract create(chat: Chat): Promise<ChatModel>;

  abstract findById(chatId: string): Promise<ChatModel | null>;

  abstract findAllByChannelId(channelId: string): Promise<ChatModel[]>;

  abstract update(chat: Chat): Promise<ChatModel>;

  abstract deleteById(chatId: string): Promise<boolean>;
}

export class ChatsRepository extends IChatsRepository {
  constructor(protected readonly chatsRepository: Repository<ChatModel>) {
    super();
  }

  async findAllByChannelId(channelId: string): Promise<ChatModel[]> {
    return await this.chatsRepository.find({
      where: {
        channel: {
          id: channelId,
          is_deleted: false,
        },
      },
    });
  }

  async findById(chatId: string): Promise<ChatModel | null> {
    return await this.chatsRepository.findOne({
      where: {
        id: chatId,
      },
    });
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

  async update(chat: Chat): Promise<ChatModel> {
    const existingChat = await this.findById(String(chat.oid));
    existingChat!.name = chat.name;
    existingChat!.type = chat.type === 'voice' ? ChatType.VOICE : ChatType.TEXT;
    return await this.chatsRepository.save(existingChat!);
  }

  async deleteById(chatId: string): Promise<boolean> {
    const channelModel = await this.findById(chatId);
    if (!channelModel) {
      return false;
    }
    await this.chatsRepository.delete(channelModel.id);
    return true;
  }
}
