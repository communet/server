import { ChannelEntity } from '../../core/entities';
import {
  CreateChannelCommand,
  CreateChannelUseCase,
  IdGeneratorPort,
  SaveChannelPort,
} from '../../core/ports';

export class CreateChannelService implements CreateChannelUseCase {
  constructor(
    private readonly saveChannelPort: SaveChannelPort,
    private readonly idGeneratorPort: IdGeneratorPort,
  ) {}

  async create(command: CreateChannelCommand): Promise<ChannelEntity> {
    const channel = new ChannelEntity(
      this.idGeneratorPort.generate(),
      command.name,
      command.creatorId,
    );

    return this.saveChannelPort.save(channel);
  }
}
