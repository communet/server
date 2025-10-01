import {
  DeleteChannelCommand,
  DeleteChannelUseCase,
  RemoveChannelPort,
} from '../../core/ports';
import { EntityNotFoundError } from '../errors';

export class DeleteChannelService implements DeleteChannelUseCase {
  constructor(private readonly removeChannelPort: RemoveChannelPort) {}

  async delete(command: DeleteChannelCommand): Promise<void> {
    const result = await this.removeChannelPort.remove(command.id);

    if (result === undefined) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Channel with id ${command.id} not found`,
        'channel',
      );
    }
  }
}
