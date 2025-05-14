import { Message } from '@/domain/entities/message.entities';
import { Profile } from '@/domain/entities/user.entities';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { MessageContent } from '@/domain/values/message.values';
import { IMessagesRepository } from '@/infra/database/repositories/message.repositories';
import { MessageDoesNotExistError } from '@/logic/exceptions/message.exceptions';
import { convertMessageModelToEntity } from '@/infra/database/converters/message.converters';
import { IMessageMixin } from '@/logic/mixin/message.mixin';

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
    protected readonly messageMixin: IMessageMixin,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(command: CreateMessageCommand): Promise<Message> {
    await this.messageMixin.getChatWithValidationOrThrow(
      String(command.profile.oid),
      command.channelId,
      command.chatId,
    );

    const messageContent = new MessageContent(command.content);
    const message = new Message(
      messageContent,
      command.profile,
      command.replyTo,
      command.chatId,
    );
    console.table(message);
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
    protected readonly messageMixin: IMessageMixin,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(command: UpdateMessageByIdCommand): Promise<Message> {
    await this.messageMixin.getChatWithValidationOrThrow(
      command.profileId,
      command.channelId,
      command.chatId,
    );

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
    protected readonly messageMixin: IMessageMixin,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(command: DeleteMessageByIdCommand): Promise<undefined> {
    await this.messageMixin.getChatWithValidationOrThrow(
      command.profileId,
      command.channelId,
      command.chatId,
    );

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
