import { Channel } from '@/domain/entities/channels.entities';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';

export abstract class IMemberMixin {
  abstract getChannelWithValidationOrThrow(channelId: string): Promise<Channel>;
}

export class MemberMixin extends IMemberMixin {
  constructor(protected readonly channelRepository: IChannelsRepository) {
    super();
  }

  async getChannelWithValidationOrThrow(channelId: string): Promise<Channel> {
    const channelModel = await this.channelRepository.findById(channelId);
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }
    return convertChannelModelToEntity(channelModel);
  }
}
