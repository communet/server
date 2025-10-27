import { Entity } from '../../../../entities';
import { DeleteMessageCommand } from '../commands';

export abstract class DeleteMessageUseCase {
  abstract delete<T extends Entity>(
    command: DeleteMessageCommand<T>,
  ): Promise<void>;
}
