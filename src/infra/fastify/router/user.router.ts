import { FastifyInstance } from 'fastify';
import { createUserController } from '../controllers';
import { withPacked } from './common';

export const UserRouter = (fastify: FastifyInstance): void => {
  const userController = createUserController();

  fastify.get(
    '/users/:id',
    withPacked(userController.getUserById.bind(userController)),
  );
  fastify.log.info('Registered GET /users/:id');
};
