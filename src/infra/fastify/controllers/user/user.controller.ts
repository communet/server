import { FastifyRequest } from 'fastify';
import { GetUserByIdService } from '../../../../application';
import { GetUserByIdQuery } from '../../../../core/ports';
import { db, UserRepository } from '../../../database';
import { Response } from '../response';
import { UserGetByIdRequest, UserGetByIdResponse } from './types';
import { UserControllerMapper } from './user-controller.mapper';

export class UserController {
  constructor(private readonly getUserByIdQuery: GetUserByIdQuery) {}

  async getUserById(
    req: FastifyRequest<UserGetByIdRequest>,
  ): Promise<Response<UserGetByIdResponse>> {
    return UserControllerMapper.toResponse(
      await this.getUserByIdQuery.getById(req.params.id),
    );
  }
}

export const createUserController = (): UserController =>
  new UserController(new GetUserByIdService(new UserRepository(db)));
