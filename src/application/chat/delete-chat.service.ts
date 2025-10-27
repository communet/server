import { Entity } from '../../core/entities';
import {
  DeleteChatUseCase,
  DeleteChatCommand,
  LoadChannelByIdPort,
  RemoveChatPort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class DeleteChatService implements DeleteChatUseCase {
  constructor(
    private readonly removeChatPort: RemoveChatPort,
    private readonly loadChannelPort: LoadChannelByIdPort,
  ) {}

  async delete<T extends Entity>(command: DeleteChatCommand<T>): Promise<void> {
    const channel = await this.loadChannelPort.loadById(command.channelId);
    if (!channel) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Channel with id ${command.channelId} not found`,
        'channel',
      );
    }

    if (command.invoker.id !== channel.creatorId) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new AccessViolationError(
        `Cannot delete chat with id ${command.id}`,
        'chat',
      );
    }

    const deletedChat = await this.removeChatPort.remove(command.id);

    if (deletedChat === undefined) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Chat with id ${command.id} not found`,
        'chat',
      );
    }
  }
}
