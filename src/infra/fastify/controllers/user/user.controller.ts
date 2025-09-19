import { FastifyReply, FastifyRequest } from 'fastify';
import { GetUserByIdService } from '../../../../application';
import { GetUserByIdQuery } from '../../../../core/ports';
import { db, UserRepository } from '../../../database';
import { UserGetByIdRequest } from './types';
import { UserControllerMapper } from './user-controller.mapper';

export class UserController {
  constructor(private readonly getUserByIdQuery: GetUserByIdQuery) {}

  async getUserById(
    req: FastifyRequest<UserGetByIdRequest>,
    rep: FastifyReply,
  ): Promise<void> {
    const result = UserControllerMapper.toResponse(
      await this.getUserByIdQuery.getById(req.params.id),
    );

    // TODO: Подумать, как лучше сделать
    if (result.error && result.code === 'not_found') {
      rep.status(404).send(result);
    } else {
      rep.status(200).send(result);
    }
  }
}

export const createUserController = (): UserController =>
  new UserController(new GetUserByIdService(new UserRepository(db)));
