import { ChannelRepository, db, MessageRepository } from '../../../database';
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
import { WithUser } from '../../router';
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
  GetMessagesHandlerParams,
  SendMessageHandlerParams,
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
  }: WithUser<GetMessagesHandlerParams>): Promise<MessageEntity[]> {
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
    user,
  }: WithUser<ChangeMessageHandlerParams>): Promise<MessageEntity> {
    return await this.changeMessageUseCase.change(
      new ChangeMessageCommand(request.params.id, request.body.content, user),
    );
  }

  async deleteMessage({
    request,
    user,
  }: WithUser<DeleteMessageHandlerParams>): Promise<void> {
    await this.deleteMessageUseCase.delete(
      new DeleteMessageCommand(
        request.params.id,
        request.params.channelId,
        user,
      ),
    );
  }
}

export const createMessageController = (): MessageController => {
  const messageRepository = new MessageRepository(db);
  const channelRepository = new ChannelRepository(db);

  return new MessageController(
    new GetMessagesByChatIdService(messageRepository),
    new SendMessageService(messageRepository, new IdGeneratorAdapter()),
    new ChangeMessageService(messageRepository, messageRepository),
    new DeleteMessageService(
      messageRepository,
      messageRepository,
      channelRepository,
    ),
  );
};
