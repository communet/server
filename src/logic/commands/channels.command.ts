import { Channel } from '@/domain/entities/channels.entities';
import { ChannelName } from '@/domain/values/channels.values';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IFileService } from '@/infra/services/minio.services';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';

export class CreateChannelCommand extends BaseCommand {
  constructor(
    public readonly name: string,
    public readonly description?: string,
    public readonly avatarBuffer?: Buffer,
    public readonly avatarFilename?: string,
  ) {
    super();
  }
}

export class CreateChannelCommandHandler extends ICommandHandler<
  CreateChannelCommand,
  Channel
> {
  constructor(
    protected readonly channelsRepository: IChannelsRepository,
    protected readonly fileService: IFileService,
  ) {
    super();
  }

  async execute(command: CreateChannelCommand): Promise<Channel> {
    const channelName = new ChannelName(command.name);
    const channel = new Channel(
      channelName,
      command.description,
      command.avatarFilename,
    );

    if (command.avatarBuffer && command.avatarFilename) {
      const avatarUrl = await this.fileService.uploadFile(
        'avatars',
        command.avatarFilename,
        command.avatarBuffer,
      );
      channel.avatarUrl = avatarUrl;
    }

    await this.channelsRepository.create(channel);
    return channel;
  }
}
