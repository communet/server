import { Entity } from '../../../../entities';
import { DeleteChannelCommand } from '../commands';

export abstract class DeleteChannelUseCase {
  abstract delete<T extends Entity>(
    command: DeleteChannelCommand<T>,
  ): Promise<void>;
}
