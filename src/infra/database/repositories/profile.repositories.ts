import { Repository } from 'typeorm';
import { Profile } from '@/domain/entities/user.entities';
import { ProfileModel } from '@/infra/database/models/profile.model';

export abstract class IProfileRepository {
  abstract create(profile: Profile): Promise<ProfileModel>;
}

export class ProfileRepository extends IProfileRepository {
  constructor(private readonly profileRepository: Repository<ProfileModel>) {
    super();
  }

  async create(profile: Profile): Promise<ProfileModel> {
    const profileModel = {
      display_username: profile.displayName,
      avatar_url: profile.avatarUrl,
      credentials: profile.credentials,
      created_at: profile.createdAt,
      updated_at: profile.updatedAt,
    };

    const newProfile = this.profileRepository.create(profileModel);
    return await this.profileRepository.save(newProfile);
  }
}
