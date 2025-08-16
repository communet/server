import { DeleteChatUseCase, RemoveChatPort } from '../../core/ports';

export class DeleteChatService implements DeleteChatUseCase {
  constructor(private readonly removeChatPort: RemoveChatPort) {}

  delete(id: string): Promise<void> {
    return this.removeChatPort.remove(id);
  }
}
