import { Entity } from '../../core/entities';
import {
  ChannelDeletionPolicy,
  DeleteChannelCommand,
  DeleteChannelUseCase,
  RemoveChannelPort,
} from '../../core/ports';
import { EntityNotFoundError, PolicyViolationError } from '../errors';

export class DeleteChannelService implements DeleteChannelUseCase {
  constructor(
    private readonly removeChannelPort: RemoveChannelPort,
    private readonly channelDeletionPolicy: ChannelDeletionPolicy,
  ) {}

  async delete<T extends Entity>(
    command: DeleteChannelCommand<T>,
  ): Promise<void> {
    if (!(await this.channelDeletionPolicy.canDelete(command))) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new PolicyViolationError(
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
