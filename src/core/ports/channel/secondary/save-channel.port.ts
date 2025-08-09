import { ChannelEntity } from '../../../entities';

export abstract class SaveChannelPort {
  abstract save(userId: string): Promise<ChannelEntity>;
}
