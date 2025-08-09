import { MessageEntity } from '../../../../entities';

export abstract class GetMessagesByChatQuery {
  abstract getMessagesByChat(chatId: string): Promise<MessageEntity[]>;
}
