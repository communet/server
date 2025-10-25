import { ChannelEntity, Entity } from '../../core/entities';
import {
  ChangeChannelNameCommand,
  ChangeChannelNameUseCase,
  LoadChannelByIdPort,
  SaveChannelPort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class ChangeChannelNameService implements ChangeChannelNameUseCase {
  constructor(
    private readonly saveChannelPort: SaveChannelPort,
    private readonly loadChannelPort: LoadChannelByIdPort,
  ) {}

  async changeName<T extends Entity>(
    command: ChangeChannelNameCommand<T>,
  ): Promise<ChannelEntity> {
    const channel = await this.loadChannelPort.loadById(command.id);

    if (!channel) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Channel with id ${command.id} not found`,
        'channel',
      );
    }

    if (channel.creatorId !== command.invoker.id) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new AccessViolationError(
        `Cannot change name for channel with id ${command.id}`,
        'channel',
      );
    }

    channel.name = command.name;

    return this.saveChannelPort.save(channel);
  }
}
