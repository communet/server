import { Entity } from '../../../../../core/entities';
import { DeleteChatCommand } from '../commands';

export abstract class DeleteChatUseCase {
  abstract delete<T extends Entity>(
    command: DeleteChatCommand<T>,
  ): Promise<void>;
}
