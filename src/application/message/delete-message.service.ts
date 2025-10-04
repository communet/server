import {
  DeleteMessageCommand,
  DeleteMessageUseCase,
  RemoveMessagePort,
} from '../../core/ports';
import { EntityNotFoundError } from '../errors';

export class DeleteMessageService implements DeleteMessageUseCase {
  constructor(private readonly removeMessagePort: RemoveMessagePort) {}

  async delete(command: DeleteMessageCommand): Promise<void> {
    const deletedMessage = await this.removeMessagePort.remove(command.id);

    if (deletedMessage === undefined) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Message with id ${command.id} not found`,
        'message',
      );
    }
  }
}
