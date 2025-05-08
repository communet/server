import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import {
  UserAlreadyConnectedError,
  UserAlreadyDisconnectedFromChannelError,
} from '@/logic/exceptions/channels.exceptions';
import { IMemberMixin } from '@/logic/mixin/member.mixin';

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
    protected readonly memberMixin: IMemberMixin,
    protected readonly membersRepository: IChannelMembersRepository,
  ) {
    super();
  }

  async execute(command: ConnectToChannelCommand): Promise<undefined> {
    await this.memberMixin.beforeHandler(command.channelId);
    const joinStatus = await this.membersRepository.connectToChannel(
      command.profileId,
      command.channelId,
    );
    if (!joinStatus) {
      throw new UserAlreadyConnectedError();
    }
  }
}

export class DisconnectFromChannelCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
  ) {
    super();
  }
}

export class DisconnectFromChannelCommandHandler extends ICommandHandler<
  DisconnectFromChannelCommand,
  undefined
> {
  constructor(
    protected readonly memberMixin: IMemberMixin,
    protected readonly membersRepository: IChannelMembersRepository,
  ) {
    super();
  }

  async execute(command: DisconnectFromChannelCommand): Promise<undefined> {
    await this.memberMixin.beforeHandler(command.channelId);
    const disconnectStatus = await this.membersRepository.disconnectFromChannel(
      command.profileId,
      command.channelId,
    );
    if (!disconnectStatus) {
      throw new UserAlreadyDisconnectedFromChannelError();
    }
  }
}
