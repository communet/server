import { Channel } from '@/domain/entities/channels.entities';
import { ChannelName } from '@/domain/values/channels.values';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { ITransactionManager } from '@/infra/database/repositories/transaction.repositories';
import { IFileService } from '@/infra/services/minio.services';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import { InvalidFileExtensionError } from '@/logic/exceptions/common.exceptions';

export class CreateChannelCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
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
    protected readonly membersRepository: IChannelMembersRepository,
    protected readonly fileService: IFileService,
    private readonly transationManager: ITransactionManager,
  ) {
    super();
  }

  async execute(command: CreateChannelCommand): Promise<Channel> {
    return await this.transationManager.transaction(async (manager) => {
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
        if (!avatarUrl) {
          throw new InvalidFileExtensionError('Invalid extension file format');
        }
        channel.avatarUrl = avatarUrl;
      }

      const channelModel = await this.channelsRepository.create(
        channel,
        manager,
      );
      await this.membersRepository.connectToChannel(
        command.profileId,
        channelModel.id,
        manager,
      );

      return channel;
    });
  }
}

export class DeleteChannelCommand extends BaseCommand {
  constructor(public readonly channelId: string) {
    super();
  }
}

export class DeleteChannelCommandHandler extends ICommandHandler<
  DeleteChannelCommand,
  Channel
> {
  constructor(protected readonly channelRepository: IChannelsRepository) {
    super();
  }

  async execute(command: DeleteChannelCommand): Promise<Channel> {
    const deletedChannelModel = await this.channelRepository.deleteById(
      command.channelId,
    );
    if (!deletedChannelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    return convertChannelModelToEntity(deletedChannelModel);
  }
}

export class UpdateChannelCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly avatarBuffer?: Buffer,
    public readonly avatarFilename?: string,
  ) {
    super();
  }
}

export class UpdateChannelCommandHandler extends ICommandHandler<
  UpdateChannelCommand,
  Channel
> {
  constructor(
    protected readonly channelRepository: IChannelsRepository,
    protected readonly fileService: IFileService,
  ) {
    super();
  }

  async execute(command: UpdateChannelCommand): Promise<Channel> {
    const channelModel = await this.channelRepository.findById(command.id);
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }
    const channel = convertChannelModelToEntity(channelModel);

    if (command.name) {
      channel.name = command.name;
    }
    if (command.description) {
      channel.description = command.description;
    }
    if (command.avatarBuffer && command.avatarFilename) {
      const avatarUrl = await this.fileService.uploadFile(
        'avatars',
        command.avatarFilename,
        command.avatarBuffer,
      );
      if (!avatarUrl) {
        throw new InvalidFileExtensionError('Invalid extension file format');
      }
      channel.avatarUrl = avatarUrl;
    }

    const isUpdated = await this.channelRepository.update(channel);
    if (!isUpdated) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    return channel;
  }
}
