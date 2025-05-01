import { Chat } from '@/domain/entities/chat.entities';
import { ChatName, ChatTypeVT } from '@/domain/values/chat.values';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';
import { convertChatModelToEntity } from '@/infra/database/converters/chat.converters';
import { ChatType } from '@/infra/database/models/chat.model';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import {
  ChatDoesNotExistError,
  UserDoesNotJoinedToChannelError,
} from '@/logic/exceptions/chat.exceptions';

export class CreateChatCommand extends BaseCommand {
  constructor(
    public readonly name: string,
    public readonly type: ChatType,
    public readonly channelId: string,
    public readonly profileId: string,
  ) {
    super();
  }
}

export class CreateChatCommandHandler extends ICommandHandler<
  CreateChatCommand,
  Chat
> {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(command: CreateChatCommand): Promise<Chat> {
    const channelModel = await this.channelsRepository.findById(
      command.channelId,
    );
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }
    const channel = convertChannelModelToEntity(channelModel);

    const isMember = await this.membersRepository.checkForMember(
      command.channelId,
      command.profileId,
    );
    if (!isMember) {
      throw new UserDoesNotJoinedToChannelError(
        'User does not joined to channel',
      );
    }

    const chatName = new ChatName(command.name);
    const chatType = new ChatTypeVT(command.type);
    const chat = new Chat(chatName, chatType, channel);

    const chatModel = await this.chatsRepository.create(chat);
    const ChatEntity = convertChatModelToEntity(chatModel);
    return ChatEntity;
  }
}

export class DeleteChatCommand extends BaseCommand {
  constructor(
    public readonly channelId: string,
    public readonly chatId: string,
    public readonly profileId: string,
  ) {
    super();
  }
}

export class DeleteChatCommandHandler extends ICommandHandler<
  DeleteChatCommand,
  undefined
> {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(command: DeleteChatCommand): Promise<undefined> {
    const channelModel = await this.channelsRepository.findById(
      command.channelId,
    );
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    const isMember = await this.membersRepository.checkForMember(
      command.channelId,
      command.profileId,
    );
    if (!isMember) {
      throw new UserDoesNotJoinedToChannelError(
        'User does not joined to channel',
      );
    }

    const chatModel = await this.chatsRepository.findById(command.chatId);
    if (!chatModel) {
      throw new ChatDoesNotExistError('Chat with given id does not exist');
    }

    const isDeleted = await this.chatsRepository.deleteById(command.chatId);
    if (!isDeleted) {
      throw new ChatDoesNotExistError('Chat with given id does not exist');
    }
  }
}
