import { ChatEntity, Entity } from '../../../../entities';
import { ChangeChatNameCommand } from '../commands';

export abstract class ChangeChatNameUseCase {
  abstract changeName<T extends Entity>(
    command: ChangeChatNameCommand<T>,
  ): Promise<ChatEntity>;
}
