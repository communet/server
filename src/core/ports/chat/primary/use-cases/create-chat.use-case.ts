import { ChatEntity, Entity } from '../../../../entities';
import { CreateChatCommand } from '../commands';

export abstract class CreateChatUseCase {
  abstract create<T extends Entity>(
    command: CreateChatCommand<T>,
  ): Promise<ChatEntity>;
}
