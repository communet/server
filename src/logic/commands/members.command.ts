import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import {
  ChannelDoesNotExistError,
  UserAlreadyConnectedError,
} from '@/logic/exceptions/channels.exceptions';

export class ConnectToChannelCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
  ) {
    super();
  }
}

export class ConnectToChannelCommandHandler extends ICommandHandler<
  ConnectToChannelCommand,
  undefined
> {
  constructor(
    protected readonly channelRepository: IChannelsRepository,
    protected readonly membersRepository: IChannelMembersRepository,
  ) {
    super();
  }

  async execute(command: ConnectToChannelCommand): Promise<undefined> {
    const channelModel = await this.channelRepository.findById(
      command.channelId,
    );
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        `Channel with ${command.channelId} does not exist`,
      );
    }

    const joinStatus = await this.membersRepository.connectToChannel(
      command.profileId,
      command.channelId,
    );
    if (!joinStatus) {
      throw new UserAlreadyConnectedError();
    }
  }
}
