import { ChannelEntity } from '../../core/entities';
import {
  ChangeChannelNameCommand,
  ChangeChannelNameUseCase,
  LoadChannelByIdPort,
  SaveChannelPort,
} from '../../core/ports';
import { EntityNotFoundError } from '../errors';

export class ChangeChannelNameService implements ChangeChannelNameUseCase {
  constructor(
    private readonly saveChannelPort: SaveChannelPort,
    private readonly loadChannelPort: LoadChannelByIdPort,
  ) {}

  async changeName(command: ChangeChannelNameCommand): Promise<ChannelEntity> {
    const channel = await this.loadChannelPort.loadById(command.id);

    if (!channel) {
      throw new EntityNotFoundError(`Channel with id ${command.id} not found`);
    }

    channel.name = command.name;

    return this.saveChannelPort.save(channel);
  }
}
