import { ChatEntity } from '../../../../entities';
import { CreateChatCommand } from '../commands';

export abstract class CreateChatUseCase {
  abstract create(command: CreateChatCommand): Promise<ChatEntity>;
}
