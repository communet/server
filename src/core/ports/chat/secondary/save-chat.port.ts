import { ChatEntity } from '../../../entities';

export abstract class SaveChatPort {
  abstract save(chat: ChatEntity): Promise<ChatEntity>;
}
