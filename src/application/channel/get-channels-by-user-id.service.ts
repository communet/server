import { ChannelEntity } from '../../core/entities';
import {
  GetChannelsByUserIdQuery,
  LoadChannelsByUserIdPort,
} from '../../core/ports';

export class GetChannelsByUserIdService implements GetChannelsByUserIdQuery {
  constructor(
    private readonly loadChannelsByUserIdPort: LoadChannelsByUserIdPort,
  ) {}

  async getChannelsByUserId(id: string): Promise<ChannelEntity[]> {
    return this.loadChannelsByUserIdPort.loadByUserId(id);
  }
}
