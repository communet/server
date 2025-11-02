import { RouteGenericInterface } from 'fastify';
import { GetUserByIdService } from '../../../../application';
import { db, UserRepository } from '../../../database';
import { UnauthorizedResponse } from '../../responses/unauthorized.response';
import { ControllerHandlerParams, WithUser } from './types';

export const withUser =
  <T extends RouteGenericInterface, R>(
    fn: (params: WithUser<ControllerHandlerParams<T>>) => R,
  ) =>
  async (
    params: ControllerHandlerParams<T>,
  ): Promise<R | UnauthorizedResponse> => {
    const user = await new GetUserByIdService(new UserRepository(db)).getById(
      '123',
    );

    if (!user) {
      return new UnauthorizedResponse();
    }

    return fn({ ...params, user: user });
  };
