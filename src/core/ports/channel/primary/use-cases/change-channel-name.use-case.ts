import { ChangeChannelNameCommand } from '../commands';
import { ChannelEntity, Entity } from '../../../../entities';

export abstract class ChangeChannelNameUseCase {
  abstract changeName<T extends Entity>(
    command: ChangeChannelNameCommand<T>,
  ): Promise<ChannelEntity>;
}
