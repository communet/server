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
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Channel with id ${command.id} not found`,
        'channel',
      );
    }

    channel.name = command.name;

    return this.saveChannelPort.save(channel);
  }
}
