import { Profile } from '@/domain/entities/user.entities';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import { BaseQuery, IQueryHandler } from '@/logic/queries/base.queries';
import { UserDoesNotExistError } from '@/logic/exceptions/users.exceptions';
import { convertProfileModelToEntity } from '@/infra/database/converters/user.converters';

export class GetUserByIdQuery extends BaseQuery {
  constructor(public readonly profileId: string) {
    super();
  }
}

export class GetUserByIdQueryHandler extends IQueryHandler<
  GetUserByIdQuery,
  Profile
> {
  constructor(protected readonly profileRepository: IProfileRepository) {
    super();
  }

  async execute(query: GetUserByIdQuery): Promise<Profile> {
    const profileModel = await this.profileRepository.findById(query.profileId);
    if (!profileModel) {
      throw new UserDoesNotExistError('User with given id does not exist');
    }
    return convertProfileModelToEntity(profileModel);
  }
}
