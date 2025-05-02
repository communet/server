import { Chat } from '@/domain/entities/chat.entities';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import {
  ChatDoesNotExistError,
  UserDoesNotJoinedToChannelError,
} from '@/logic/exceptions/chat.exceptions';
import { convertChatModelToEntity } from '@/infra/database/converters/chat.converters';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';

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
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(query: GetChatByIdQuery): Promise<Chat> {
    const channel = await this.channelsRepository.findById(query.channelId);
    if (!channel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    const member = await this.membersRepository.checkForMember(
      query.channelId,
      query.profileId,
    );
    if (!member) {
      throw new UserDoesNotJoinedToChannelError(
        'User does not joined to channel',
      );
    }

    const chatModel = await this.chatsRepository.findById(query.chatId);
    if (!chatModel) {
      throw new ChatDoesNotExistError(
        `Chat with ${query.chatId} id does not exist`,
      );
    }

    return convertChatModelToEntity(chatModel);
  }
}
