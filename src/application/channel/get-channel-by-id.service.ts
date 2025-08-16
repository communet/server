import { ChannelEntity } from '../../core/entities';
import { GetChannelByIdQuery, LoadChannelByIdPort } from '../../core/ports';

export class GetChannelByIdService implements GetChannelByIdQuery {
  constructor(private readonly loadChannelPort: LoadChannelByIdPort) {}

  async getChannelById(id: string): Promise<ChannelEntity | null> {
    return this.loadChannelPort.loadById(id);
  }
}
