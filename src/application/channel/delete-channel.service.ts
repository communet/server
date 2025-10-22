import { Entity } from '../../core/entities';
import {
  DeleteChannelCommand,
  DeleteChannelUseCase,
  LoadChannelByIdPort,
  RemoveChannelPort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class DeleteChannelService implements DeleteChannelUseCase {
  constructor(
    private readonly removeChannelPort: RemoveChannelPort,
    private readonly loadChannelByIdPort: LoadChannelByIdPort,
  ) {}

  async delete<T extends Entity>(
    command: DeleteChannelCommand<T>,
  ): Promise<void> {
    const channel = await this.loadChannelByIdPort.loadById(command.id);

    if (channel !== null && channel.creatorId !== command.invoker.id) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new AccessViolationError(
        `Cannot delete channel with id ${command.id}`,
        'channel',
      );
    }

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
