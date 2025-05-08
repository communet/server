import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import { UserDoesNotJoinedToChannelError } from '@/logic/exceptions/chat.exceptions';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';
import { Channel } from '@/domain/entities/channels.entities';

export abstract class IChatMixin {
  abstract getChannelWithValidationOrThrow(
    profileId: string,
    channelId: string,
  ): Promise<Channel>;
}

export class ChatMixin extends IChatMixin {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
  ) {
    super();
  }

  async getChannelWithValidationOrThrow(
    profileId: string,
    channelId: string,
  ): Promise<Channel> {
    const channel = await this.channelsRepository.findById(channelId);
    if (!channel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    const member = await this.membersRepository.checkForMember(
      channelId,
      profileId,
    );
    if (!member) {
      throw new UserDoesNotJoinedToChannelError(
        'User does not joined to channel',
      );
    }

    return convertChannelModelToEntity(channel);
  }
}
