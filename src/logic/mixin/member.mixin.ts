import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';

export abstract class IMemberMixin {
  abstract beforeHandler(channelId: string): Promise<undefined>;
}

export class MemberMixin extends IMemberMixin {
  constructor(protected readonly channelRepository: IChannelsRepository) {
    super();
  }

  async beforeHandler(channelId: string): Promise<undefined> {
    const channelModel = await this.channelRepository.findById(channelId);
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }
  }
}
