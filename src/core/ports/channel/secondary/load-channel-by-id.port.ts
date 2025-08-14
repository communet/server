import { ChannelEntity } from '../../../entities';

export abstract class LoadChannelByIdPort {
  abstract loadById(id: string): Promise<ChannelEntity | null>;
}
