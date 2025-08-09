import { ChatEntity } from '../../../entities';

export abstract class RemoveChatPort {
  abstract remove(id: string): Promise<ChatEntity>;
}
