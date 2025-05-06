import { Message } from '@/domain/entities/message.entities';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { IMessagesRepository } from '@/infra/database/repositories/message.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import {
  ChatDoesNotExistError,
  UserDoesNotJoinedToChannelError,
} from '@/logic/exceptions/chat.exceptions';
import { MessageDoesNotExistError } from '@/logic/exceptions/message.exceptions';
import { convertMessageModelToEntity } from '@/infra/database/converters/message.converters';

export class GetMessageByIdQuery extends BaseQuery {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
    public readonly chatId: string,
    public readonly messageId: string,
  ) {
    super();
  }
}

export class GetMessageByIdQueryHandler extends IQueryHandler<
  GetMessageByIdQuery,
  Message
> {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly chatsRepository: IChatsRepository,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(query: GetMessageByIdQuery): Promise<Message> {
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
      throw new ChatDoesNotExistError('Chat with given id does not exist');
    }

    const messageModel = await this.messagesRepository.findById(
      query.messageId,
    );
    if (!messageModel) {
      throw new MessageDoesNotExistError(
        'Message with given id does not exist',
      );
    }

    return convertMessageModelToEntity(messageModel);
  }
}
