import { ChatEntity } from '../../../entities';

export abstract class EditChatNamePort {
  abstract editName(id: string, name: string): Promise<ChatEntity>;
}
