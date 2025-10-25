import { ChangeMessageCommand } from '../commands';
import { Entity, MessageEntity } from '../../../../entities';

export abstract class ChangeMessageUseCase {
  abstract change<T extends Entity>(
    command: ChangeMessageCommand<T>,
  ): Promise<MessageEntity>;
}
