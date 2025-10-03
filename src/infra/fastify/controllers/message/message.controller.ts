import { db, MessageRepository } from '../../../database';
import { MessageEntity } from '../../../../core/entities';
import {
  DeleteMessageCommand,
  DeleteMessageUseCase,
  SendMessageCommand,
  SendMessageUseCase,
} from '../../../../core/ports';
import { WithUser } from '../../router';
import {
  DeleteMessageService,
  SendMessageService,
} from '../../../../application';
import { IdGeneratorAdapter } from '../../../common';
import { DeleteMessageHandlerParams, SendMessageHandlerParams } from './types';

class MessageController {
  constructor(
    private readonly createMessageUseCase: SendMessageUseCase,
    private readonly deleteMessageUseCase: DeleteMessageUseCase,
  ) {}

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

  async deleteMessage({ request }: DeleteMessageHandlerParams): Promise<void> {
    await this.deleteMessageUseCase.delete(
      new DeleteMessageCommand(request.params.id),
    );
  }
}

export const createMessageController = (): MessageController => {
  const repository = new MessageRepository(db);

  return new MessageController(
    new SendMessageService(repository, new IdGeneratorAdapter()),
    new DeleteMessageService(repository),
  );
};
