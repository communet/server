import { FastifyInstance } from 'fastify';
import { createUserController } from '../../controllers/user/user.controller';

export const UserRouter = (fastify: FastifyInstance): void => {
  const userController = createUserController();

  fastify.get('/user/:id', userController.getUserById.bind(userController));
};
