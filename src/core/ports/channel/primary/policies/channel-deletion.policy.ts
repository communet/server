import { Entity } from '../../../../entities';
import { DeleteChannelCommand } from '../commands';

export abstract class ChannelDeletionPolicy {
  abstract canDelete<T extends Entity>(
    command: DeleteChannelCommand<T>,
  ): Promise<boolean>;
}
