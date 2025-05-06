import { Message } from '@/domain/entities/message.entities';
import { Profile } from '@/domain/entities/user.entities';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import {
  ChatDoesNotExistError,
  UserDoesNotJoinedToChannelError,
} from '@/logic/exceptions/chat.exceptions';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { MessageContent } from '@/domain/values/message.values';
import { convertChatModelToEntity } from '@/infra/database/converters/chat.converters';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { IMessagesRepository } from '@/infra/database/repositories/message.repositories';
import { MessageDoesNotExistError } from '@/logic/exceptions/message.exceptions';
import { convertMessageModelToEntity } from '@/infra/database/converters/message.converters';

export class CreateMessageCommand extends BaseCommand {
  constructor(
    public readonly profile: Profile,
    public readonly channelId: string,
    public readonly chatId: string,
    public readonly content: string,
    public readonly replyTo: string | undefined,
  ) {
    super();
  }
}

export class CreateMessageCommandHandler extends ICommandHandler<
  CreateMessageCommand,
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

  async execute(command: CreateMessageCommand): Promise<Message> {
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
      String(command.profile.oid),
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

    const messageContent = new MessageContent(command.content);
    const message = new Message(
      messageContent,
      command.profile,
      convertChatModelToEntity(chatModel),
      command.replyTo,
    );

    await this.messagesRepository.create(message);

    return message;
  }
}

export class UpdateMessageByIdCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
    public readonly chatId: string,
    public readonly messageId: string,
    public readonly content: string,
  ) {
    super();
  }
}

export class UpdateMessageByIdCommandHandler extends ICommandHandler<
  UpdateMessageByIdCommand,
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

  async execute(command: UpdateMessageByIdCommand): Promise<Message> {
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

    const messageModel = await this.messagesRepository.findById(
      command.messageId,
    );
    if (!messageModel) {
      throw new MessageDoesNotExistError(
        'Message with given id does not exist',
      );
    }

    const message = convertMessageModelToEntity(messageModel);
    message.content = command.content;
    await this.messagesRepository.update(message);

    return message;
  }
}

export class DeleteMessageByIdCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
    public readonly chatId: string,
    public readonly messageId: string,
  ) {
    super();
  }
}

export class DeleteMessageByIdCommandHandler extends ICommandHandler<
  DeleteMessageByIdCommand,
  undefined
> {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly chatsRepository: IChatsRepository,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(command: DeleteMessageByIdCommand): Promise<undefined> {
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

    const isDeleted = await this.messagesRepository.deleteById(
      command.messageId,
    );
    if (!isDeleted) {
      throw new MessageDoesNotExistError(
        'Message with given id does not exist',
      );
    }
  }
}
