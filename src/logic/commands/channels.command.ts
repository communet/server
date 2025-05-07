import { Channel } from '@/domain/entities/channels.entities';
import { Profile } from '@/domain/entities/user.entities';
import { ChannelName } from '@/domain/values/channels.values';
import { convertChannelModelToEntity } from '@/infra/database/converters/channel.converters';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { ITransactionManager } from '@/infra/database/repositories/transaction.repositories';
import { IFileService } from '@/infra/services/minio.services';
import { validateAvatarFileExtension } from '@/infra/utils/minio.utils';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { ChannelDoesNotExistError } from '@/logic/exceptions/channels.exceptions';
import { InvalidFileExtensionError } from '@/logic/exceptions/common.exceptions';

export class CreateChannelCommand extends BaseCommand {
  constructor(
    public readonly profile: Profile,
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
        if (!validateAvatarFileExtension(command.avatarFilename)) {
          throw new InvalidFileExtensionError('Invalid extension file format');
        }

        const avatarUrl = await this.fileService.uploadFile(
          'avatars',
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
        String(command.profile.oid),
        channelModel.id,
        manager,
      );

      channel.members = [command.profile];
      return channel;
    });
  }
}

export class DeleteChannelCommand extends BaseCommand {
  constructor(
    public readonly profileId: string,
    public readonly channelId: string,
  ) {
    super();
  }
}

export class DeleteChannelCommandHandler extends ICommandHandler<
  DeleteChannelCommand,
  undefined
> {
  constructor(protected readonly channelRepository: IChannelsRepository) {
    super();
  }

  async execute(command: DeleteChannelCommand): Promise<undefined> {
    const deletedChannelModel = await this.channelRepository.deleteById(
      command.profileId,
      command.channelId,
    );
    if (!deletedChannelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }
  }
}

export class UpdateChannelCommand extends BaseCommand {
  constructor(
    public readonly profile: Profile,
    public readonly channelId: string,
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
    const channelModel = await this.channelRepository.findById(
      command.channelId,
    );
    if (!channelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    let newAvatar = command.avatarFilename;
    if (command.avatarBuffer && command.avatarFilename) {
      if (!validateAvatarFileExtension(command.avatarFilename)) {
        throw new InvalidFileExtensionError('Invalid extension file format');
      }

      const avatarUrl = await this.fileService.uploadFile(
        'avatars',
        command.avatarBuffer,
      );
      newAvatar = avatarUrl;
    }

    const updatedChannelModel = await this.channelRepository.update(
      String(command.profile.oid),
      command.channelId,
      command.name,
      command.description,
      newAvatar,
    );

    if (!updatedChannelModel) {
      throw new ChannelDoesNotExistError(
        'Channel with given id does not exist',
      );
    }

    return convertChannelModelToEntity(updatedChannelModel);
  }
}
