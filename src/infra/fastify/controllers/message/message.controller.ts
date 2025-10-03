import { db, MessageRepository } from '../../../database';
import { MessageEntity } from '../../../../core/entities';
import { SendMessageCommand, SendMessageUseCase } from '../../../../core/ports';
import { WithUser } from '../../router';
import { SendMessageService } from '../../../../application';
import { IdGeneratorAdapter } from '../../../common';
import { SendMessageHandlerParams } from './types';

class MessageController {
  constructor(private readonly createMessageUseCase: SendMessageUseCase) {}

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
}

export const createMessageController = (): MessageController => {
  const repository = new MessageRepository(db);

  return new MessageController(
    new SendMessageService(repository, new IdGeneratorAdapter()),
  );
};
