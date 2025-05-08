import { Message } from '@/domain/entities/message.entities';
import { IMessagesRepository } from '@/infra/database/repositories/message.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import { MessageDoesNotExistError } from '@/logic/exceptions/message.exceptions';
import { convertMessageModelToEntity } from '@/infra/database/converters/message.converters';
import { IMessageMixin } from '@/logic/mixin/message.mixin';

export class GetAllMessagesQuery extends BaseQuery {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
    public readonly chatId: string,
  ) {
    super();
  }
}

export class GetAllMessagesQueryHandler extends IQueryHandler<
  GetAllMessagesQuery,
  Message[]
> {
  constructor(
    protected readonly meessageMixin: IMessageMixin,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(query: GetAllMessagesQuery): Promise<Message[]> {
    await this.meessageMixin.beforeHandler(
      query.profileId,
      query.channelId,
      query.chatId,
    );

    const messages: Message[] = [];
    const messagesModels = await this.messagesRepository.findAllByChat(
      query.chatId,
    );

    messagesModels.map((messageModel) => {
      messages.push(convertMessageModelToEntity(messageModel));
    });

    return messages;
  }
}

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
    protected readonly messageMixin: IMessageMixin,
    protected readonly messagesRepository: IMessagesRepository,
  ) {
    super();
  }

  async execute(query: GetMessageByIdQuery): Promise<Message> {
    await this.messageMixin.beforeHandler(
      query.profileId,
      query.channelId,
      query.chatId,
    );

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
