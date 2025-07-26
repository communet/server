import { DeleteMessageCommand } from '../commands';

export abstract class DeleteMessageUseCase {
  abstract delete(command: DeleteMessageCommand): Promise<void>;
}
