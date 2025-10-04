import { DeleteChatUseCase, RemoveChatPort } from '../../core/ports';
import { EntityNotFoundError } from '../errors';

export class DeleteChatService implements DeleteChatUseCase {
  constructor(private readonly removeChatPort: RemoveChatPort) {}

  async delete(id: string): Promise<void> {
    const deletedChat = await this.removeChatPort.remove(id);

    if (deletedChat === undefined) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(`Chat with id ${id} not found`, 'chat');
    }
  }
}
