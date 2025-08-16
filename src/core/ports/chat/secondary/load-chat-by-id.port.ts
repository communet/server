import { ChatEntity } from '../../../entities';

export abstract class LoadChatByIdPort {
  abstract load(id: string): Promise<ChatEntity | null>;
}
