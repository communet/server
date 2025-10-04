import { db, MessageRepository } from '../../../database';
import { MessageEntity } from '../../../../core/entities';
import {
  ChangeMessageCommand,
  ChangeMessageUseCase,
  DeleteMessageCommand,
  DeleteMessageUseCase,
  GetMessagesByChatQuery,
  SendMessageCommand,
  SendMessageUseCase,
} from '../../../../core/ports';
import { ControllerHandlerParams, WithUser } from '../../router';
import {
  ChangeMessageService,
  DeleteMessageService,
  GetMessagesByChatIdService,
  SendMessageService,
} from '../../../../application';
import { IdGeneratorAdapter } from '../../../common';
import {
  ChangeMessageHandlerParams,
  DeleteMessageHandlerParams,
  SendMessageHandlerParams,
  WithChatId,
} from './types';

class MessageController {
  constructor(
    private readonly getMessagesByChatQuery: GetMessagesByChatQuery,
    private readonly createMessageUseCase: SendMessageUseCase,
    private readonly changeMessageUseCase: ChangeMessageUseCase,
    private readonly deleteMessageUseCase: DeleteMessageUseCase,
  ) {}

  getMessages({
    request,
  }: WithChatId<ControllerHandlerParams>): Promise<MessageEntity[]> {
    return this.getMessagesByChatQuery.getMessagesByChat(request.params.chatId);
  }

  async sendMessage({
    request,
    user,
  }: WithUser<SendMessageHandlerParams>): Promise<MessageEntity> {
    const message = await this.createMessageUseCase.send(
      new SendMessageCommand(
        request.body.content,
        user.id,
        request.params.chatId,
      ),
    );

    return message;
  }

  async changeMessage({
    request,
  }: ChangeMessageHandlerParams): Promise<MessageEntity> {
    return await this.changeMessageUseCase.change(
      new ChangeMessageCommand(request.params.id, request.body.content),
    );
  }

  async deleteMessage({ request }: DeleteMessageHandlerParams): Promise<void> {
    await this.deleteMessageUseCase.delete(
      new DeleteMessageCommand(request.params.id),
    );
  }
}

export const createMessageController = (): MessageController => {
  const repository = new MessageRepository(db);

  return new MessageController(
    new GetMessagesByChatIdService(repository),
    new SendMessageService(repository, new IdGeneratorAdapter()),
    new ChangeMessageService(repository, repository),
    new DeleteMessageService(repository),
  );
};
