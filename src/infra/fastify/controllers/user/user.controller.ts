import { GetUserByIdService } from '../../../../application';
import { UserEntity } from '../../../../core/entities';
import { GetUserByIdQuery } from '../../../../core/ports';
import { db, UserRepository } from '../../../database';
import { NotFoundResponse } from '../../responses';
import { ControllerHandlerParams } from '../../router/';
import { UserGetByIdRequest } from './types';

export class UserController {
  constructor(private readonly getUserByIdQuery: GetUserByIdQuery) {}

  async getUserById({
    request,
  }: ControllerHandlerParams<UserGetByIdRequest>): Promise<
    UserEntity | NotFoundResponse
  > {
    const result = await this.getUserByIdQuery.getById(request.params.id);

    if (!result) {
      return new NotFoundResponse(`User #${request.params.id} not found`);
    }

    return result;
  }
}

export const createUserController = (): UserController =>
  new UserController(new GetUserByIdService(new UserRepository(db)));
