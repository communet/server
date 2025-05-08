import { Chat } from '@/domain/entities/chat.entities';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import { ChatDoesNotExistError } from '@/logic/exceptions/chat.exceptions';
import { convertChatModelToEntity } from '@/infra/database/converters/chat.converters';
import { IChatMixin } from '@/logic/mixin/chat.mixin';

export class GetChatByIdQuery extends BaseQuery {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
    public readonly chatId: string,
  ) {
    super();
  }
}

export class GetChatByIdQueryHandler extends IQueryHandler<
  GetChatByIdQuery,
  Chat
> {
  constructor(
    protected readonly chatMixin: IChatMixin,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(query: GetChatByIdQuery): Promise<Chat> {
    await this.chatMixin.beforeHandler(query.profileId, query.channelId);

    const chatModel = await this.chatsRepository.findById(query.chatId);
    if (!chatModel) {
      throw new ChatDoesNotExistError(
        `Chat with ${query.chatId} id does not exist`,
      );
    }

    return convertChatModelToEntity(chatModel);
  }
}

export class GetChatsQuery extends BaseQuery {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
  ) {
    super();
  }
}

export class GetChatsQueryHandler extends IQueryHandler<GetChatsQuery, Chat[]> {
  constructor(
    protected readonly chatMixin: IChatMixin,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(query: GetChatsQuery): Promise<Chat[]> {
    await this.chatMixin.beforeHandler(query.profileId, query.channelId);

    const chatModels = await this.chatsRepository.findAllByChannelId(
      query.channelId,
    );
    const chats = [];
    if (chatModels) {
      for (const model of chatModels) {
        chats.push(convertChatModelToEntity(model));
      }
    }

    return chats;
  }
}
