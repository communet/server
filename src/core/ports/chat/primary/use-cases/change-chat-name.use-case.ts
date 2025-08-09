import { ChatEntity } from '../../../../entities';
import { ChangeChatNameCommand } from '../commands';

export abstract class ChangeChatNameUseCase {
  abstract changeName(command: ChangeChatNameCommand): Promise<ChatEntity>;
}
