import { GetUserByIdService } from '../../../../application';
import { UserEntity } from '../../../../core/entities';
import { GetUserByIdQuery } from '../../../../core/ports';
import { db, UserRepository } from '../../../database';
import { NotFoundResponse } from '../../responses';
import { ControllerHandlerParams, WithUser } from '../../router';
import { GetUserByIdHandlerParams } from './types';

class UserController {
  constructor(private readonly getUserByIdQuery: GetUserByIdQuery) {}

  async getUserById({
    request,
  }: GetUserByIdHandlerParams): Promise<UserEntity | NotFoundResponse> {
    const result = await this.getUserByIdQuery.getById(request.params.id);

    if (!result) {
      return new NotFoundResponse(`User #${request.params.id} not found`);
    }

    return result;
  }

  getMe({ user }: WithUser<ControllerHandlerParams>): UserEntity {
    return user;
  }
}

export const createUserController = (): UserController =>
  new UserController(new GetUserByIdService(new UserRepository(db)));
