import { Chat } from '@/domain/entities/chat.entities';
import { convertChatModelToEntity } from '@/infra/database/converters/chat.converters';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import {
  ChatDoesNotExistError,
  UserDoesNotJoinedToChannelError,
} from '@/logic/exceptions/chat.exceptions';

export abstract class IMessageMixin {
  abstract getChatWithValidationOrThrow(
    profileId: string,
    channelid: string,
    chatId: string,
  ): Promise<Chat>;
}

export class MessageMixin extends IMessageMixin {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }
  async getChatWithValidationOrThrow(
    profileId: string,
    channelid: string,
    chatId: string,
  ): Promise<Chat> {
    const channelModel = await this.channelsRepository.findById(channelid);
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    const isMember = await this.membersRepository.checkForMember(
      channelid,
      profileId,
    );
    if (!isMember) {
      throw new UserDoesNotJoinedToChannelError(
        'User does not joined to channel',
      );
    }

    const chatModel = await this.chatsRepository.findById(chatId);
    if (!chatModel) {
      throw new ChatDoesNotExistError('Chat with given id does not exist');
    }

    return convertChatModelToEntity(chatModel);
  }
}
