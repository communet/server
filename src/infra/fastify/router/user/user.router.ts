import fp from 'fastify-plugin';
import { createUserController } from '../../controllers/user/user.controller';

export const UserRouter = fp(
  (fastify) => {
    const userController = createUserController();

    fastify.get('/user/:id', userController.getUserById.bind(userController));
  },
  { name: 'user-router' },
);
