import { CreateChannelCommand } from '../commands';
import { ChannelEntity } from '../../../../entities';

export abstract class CreateChannelUseCase {
  abstract create(command: CreateChannelCommand): Promise<ChannelEntity>;
}
