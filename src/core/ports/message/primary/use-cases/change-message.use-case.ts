import { ChangeMessageCommand } from '../commands';
import { MessageEntity } from '../../../../entities';

export abstract class ChangeMessageUseCase {
  abstract change(command: ChangeMessageCommand): Promise<MessageEntity>;
}
