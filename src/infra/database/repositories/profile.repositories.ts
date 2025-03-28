import { EntityManager, Repository } from 'typeorm';
import { Profile } from '@/domain/entities/user.entities';
import { ProfileModel } from '@/infra/database/models/profile.model';

export abstract class IProfileRepository {
  abstract create(
    profile: Profile,
    manager?: EntityManager,
  ): Promise<ProfileModel>;

  abstract update(profile: Profile): Promise<ProfileModel | null>;

  abstract findById(profileId: string): Promise<ProfileModel | null>;
}

export class ProfileRepository extends IProfileRepository {
  constructor(private readonly profileRepository: Repository<ProfileModel>) {
    super();
  }

  async create(
    profile: Profile,
    manager?: EntityManager,
  ): Promise<ProfileModel> {
    const profileModel = {
      id: String(profile.oid),
      display_username: profile.displayName,
      avatar_url: profile.avatarUrl,
      credentials: { id: String(profile.credentials.oid) },
    };

    const repository =
      manager?.getRepository(ProfileModel) ?? this.profileRepository;
    const newProfile = repository.create(profileModel);
    return await repository.save(newProfile);
  }

  async update(profile: Profile): Promise<ProfileModel | null> {
    const existingProfile = await this.findById(String(profile.oid));
    if (!existingProfile) {
      return null;
    }
    existingProfile.display_username = profile.displayName;
    existingProfile.avatar_url = profile.avatarUrl;
    return await this.profileRepository.save(existingProfile);
  }

  async findById(profileId: string): Promise<ProfileModel | null> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['credentials'],
    });

    return profile;
  }
}
