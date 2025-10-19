import { Entity } from '../../../core/entities';
import {
  ChannelDeletionPolicy,
  DeleteChannelCommand,
  LoadChannelByIdPort,
} from '../../../core/ports';

export class StandardChannelDeletionPolicy implements ChannelDeletionPolicy {
  constructor(private readonly loadChannelByIdPort: LoadChannelByIdPort) {}

  async canDelete<T extends Entity>(
    command: DeleteChannelCommand<T>,
  ): Promise<boolean> {
    const channel = await this.loadChannelByIdPort.loadById(command.id);

    return channel === null || channel.creatorId === command.invoker.id;
  }
}
