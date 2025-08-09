import { MessageEntity } from '../../../entities';

export abstract class LoadByChatIdPort {
  abstract loadByChatId(chatId: string): Promise<MessageEntity[]>;
}
