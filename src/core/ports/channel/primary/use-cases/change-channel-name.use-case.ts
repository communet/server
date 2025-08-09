import { ChangeChannelNameCommand } from '../commands';
import { ChannelEntity } from '../../../../entities';

export abstract class ChangeChannelNameUseCase {
  abstract changeName(
    command: ChangeChannelNameCommand,
  ): Promise<ChannelEntity>;
}
