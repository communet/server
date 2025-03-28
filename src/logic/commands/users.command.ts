import { Profile } from '@/domain/entities/user.entities';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { UserDoesNotExistError } from '@/logic/exceptions/users.exceptions';
import { convertProfileModelToEntity } from '@/infra/database/converters/user.converters';
import { DisplayName } from '@/domain/values/user.values';
import { IFileService } from '@/infra/services/minio.services';

export class UpdateCurrentUserCommand extends BaseCommand {
  constructor(
    public readonly profile: Profile,
    public readonly displayName?: string,
    public readonly avatarBuffer?: Buffer,
    public readonly avatarFilename?: string,
  ) {
    super();
  }
}

export class UpdateCurrentUserCommandHandler extends ICommandHandler<
  UpdateCurrentUserCommand,
  Profile
> {
  constructor(
    protected readonly profileRepository: IProfileRepository,
    protected readonly fileService: IFileService,
  ) {
    super();
  }
  async execute(command: UpdateCurrentUserCommand): Promise<Profile> {
    const profileId = String(command.profile.oid);
    const profileModel = await this.profileRepository.findById(profileId);
    if (!profileModel) {
      throw new UserDoesNotExistError(
        `User with ${profileId} id does not exist`,
      );
    }
    const profile = convertProfileModelToEntity(profileModel);

    if (command.avatarBuffer && command.avatarFilename) {
      const avatarUrl = await this.fileService.uploadFile(
        'avatars',
        command.avatarFilename,
        command.avatarBuffer,
      );
      profile.avatarUrl = avatarUrl;
    }

    if (command.displayName) {
      profile.displayName = new DisplayName(command.displayName);
    }

    const updatedProfileModel = await this.profileRepository.update(profile);
    if (!updatedProfileModel) {
      throw new UserDoesNotExistError(
        `User with ${profileId} id does not exist`,
      );
    }
    const updatedProfile = convertProfileModelToEntity(updatedProfileModel);
    return updatedProfile;
  }
}
