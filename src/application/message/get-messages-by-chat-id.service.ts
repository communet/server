import { MessageEntity } from '../../core/entities';
import { GetMessagesByChatQuery, LoadByChatIdPort } from '../../core/ports';

export class GetMessagesByChatIdService implements GetMessagesByChatQuery {
  constructor(private readonly loadMessagesByChatIdPort: LoadByChatIdPort) {}

  getMessagesByChat(chatId: string): Promise<MessageEntity[]> {
    return this.loadMessagesByChatIdPort.loadByChatId(chatId);
  }
}
