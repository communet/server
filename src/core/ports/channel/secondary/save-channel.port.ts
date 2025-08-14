import { ChannelEntity } from '../../../entities';

export abstract class SaveChannelPort {
  abstract save(channel: ChannelEntity): Promise<ChannelEntity>;
}
