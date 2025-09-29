import { FastifyInstance } from 'fastify';
import { createChannelController } from '../controllers';
import { withPacked, withUser } from './common';

export const ChannelRouter = (fastify: FastifyInstance): void => {
  const userController = createChannelController();

  fastify.get(
    '/channels',
    withPacked(withUser(userController.getChannels.bind(userController))),
  );
  fastify.post(
    '/channels',
    withPacked(withUser(userController.createChannel.bind(userController))),
  );
};
