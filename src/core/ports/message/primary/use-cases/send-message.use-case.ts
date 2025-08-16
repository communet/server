import { SendMessageCommand } from '../commands';
import { MessageEntity } from '../../../../entities';

export abstract class SendMessageUseCase {
  abstract send(command: SendMessageCommand): Promise<MessageEntity>;
}
