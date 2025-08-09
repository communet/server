import { CreateMessageCommand } from '../commands';
import { MessageEntity } from '../../../../entities';

export abstract class CreateMessageUseCase {
  abstract create(command: CreateMessageCommand): Promise<MessageEntity>;
}
