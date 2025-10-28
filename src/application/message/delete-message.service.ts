import { Entity } from '../../core/entities';
import {
  DeleteMessageCommand,
  DeleteMessageUseCase,
  LoadChannelByIdPort,
  LoadMessageByIdPort,
  RemoveMessagePort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class DeleteMessageService implements DeleteMessageUseCase {
  constructor(
    private readonly loadMessageByIdPort: LoadMessageByIdPort,
    private readonly removeMessagePort: RemoveMessagePort,
    private readonly loadChannelByPort: LoadChannelByIdPort,
  ) {}

  async delete<T extends Entity>(
    command: DeleteMessageCommand<T>,
  ): Promise<void> {
    const channel = await this.loadChannelByPort.loadById(command.channelId);
    if (!channel) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Channel with id ${command.channelId} not found`,
        'channel',
      );
    }

    const message = await this.loadMessageByIdPort.load(command.id);
    if (!message) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Message with id ${command.id} not found`,
        'message',
      );
    }

    if (
      command.invoker.id !== channel.creatorId &&
      command.invoker.id !== message.senderId
    ) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new AccessViolationError(
        `Cannot delete message with id ${command.id}`,
        'message',
      );
    }

    await this.removeMessagePort.remove(command.id);
  }
}
