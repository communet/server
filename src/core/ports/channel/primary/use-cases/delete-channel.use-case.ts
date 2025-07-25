import { DeleteChannelCommand } from '../commands';

export abstract class DeleteChannelUseCase {
  abstract delete(command: DeleteChannelCommand): Promise<void>;
}
