import {
  DeleteChannelCommand,
  DeleteChannelUseCase,
  RemoveChannelPort,
} from '../../core/ports';

export class DeleteChannelService implements DeleteChannelUseCase {
  constructor(private readonly removeChannelPort: RemoveChannelPort) {}

  async delete(command: DeleteChannelCommand): Promise<void> {
    await this.removeChannelPort.remove(command.id);
  }
}
