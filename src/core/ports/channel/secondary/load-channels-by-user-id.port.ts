import { ChannelEntity } from '../../../entities';

export abstract class LoadChannelsByUserIdPort {
  abstract loadByUserId(userId: string): Promise<ChannelEntity[]>;
}
