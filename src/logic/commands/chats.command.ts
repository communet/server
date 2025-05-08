import { Chat } from '@/domain/entities/chat.entities';
import { ChatName, ChatTypeVT } from '@/domain/values/chat.values';
import { convertChatModelToEntity } from '@/infra/database/converters/chat.converters';
import { ChatType } from '@/infra/database/models/chat.model';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { ChatDoesNotExistError } from '@/logic/exceptions/chat.exceptions';
import { IChatMixin } from '@/logic/mixin/chat.mixin';

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
    protected readonly chatMixin: IChatMixin,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(command: CreateChatCommand): Promise<Chat> {
    const channel = await this.chatMixin.beforeHandler(
      command.profileId,
      command.channelId,
    );

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
    protected readonly chatMixin: IChatMixin,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(command: DeleteChatCommand): Promise<undefined> {
    await this.chatMixin.beforeHandler(command.profileId, command.channelId);

    const isDeleted = await this.chatsRepository.deleteById(command.chatId);
    if (!isDeleted) {
      throw new ChatDoesNotExistError('Chat with given id does not exist');
    }
  }
}

export class UpdateChatCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
    public readonly chatId: string,
    public readonly name?: string,
    public readonly type?: string,
  ) {
    super();
  }
}

export class UpdateChatCommandHandler extends ICommandHandler<
  UpdateChatCommand,
  Chat
> {
  constructor(
    protected readonly chatMixin: IChatMixin,
    protected readonly chatsRepository: IChatsRepository,
  ) {
    super();
  }

  async execute(command: UpdateChatCommand): Promise<Chat> {
    await this.chatMixin.beforeHandler(command.profileId, command.channelId);

    const chatModel = await this.chatsRepository.findById(command.chatId);
    if (!chatModel) {
      throw new ChatDoesNotExistError('Chat with given id does not exist');
    }

    const chat = convertChatModelToEntity(chatModel);
    chat.name = command.name;
    chat.type = command.type;
    await this.chatsRepository.update(chat);

    return chat;
  }
}
