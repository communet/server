import { MessageEntity } from '../../core/entities';
import {
  IdGeneratorPort,
  SaveMessagePort,
  SendMessageCommand,
  SendMessageUseCase,
} from '../../core/ports';

export class SendMessageService implements SendMessageUseCase {
  constructor(
    private readonly saveMessagePort: SaveMessagePort,
    private readonly idGeneratorPort: IdGeneratorPort,
  ) {}

  send(command: SendMessageCommand): Promise<MessageEntity> {
    const message = new MessageEntity({
      id: this.idGeneratorPort.generate(),
      content: command.content,
      senderId: command.senderId,
      chatId: command.chatId,
    });

    return this.saveMessagePort.save(message);
  }
}
