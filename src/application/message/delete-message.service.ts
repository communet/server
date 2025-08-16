import {
  DeleteMessageCommand,
  DeleteMessageUseCase,
  RemoveMessagePort,
} from '../../core/ports';

export class DeleteMessageService implements DeleteMessageUseCase {
  constructor(private readonly removeMessagePort: RemoveMessagePort) {}

  delete(command: DeleteMessageCommand): Promise<void> {
    return this.removeMessagePort.remove(command.id);
  }
}
