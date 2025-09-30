import { FastifyInstance } from 'fastify';
import { createChannelController } from '../controllers';
import { withPacked, withUser } from './common';

export const ChannelRouter = (fastify: FastifyInstance): void => {
  const channelController = createChannelController();

  fastify.get(
    '/channels',
    withPacked(withUser(channelController.getChannels.bind(channelController))),
  );
  fastify.log.info('Registered GET /channels');

  fastify.post(
    '/channels',
    withPacked(
      withUser(channelController.createChannel.bind(channelController)),
    ),
  );
  fastify.log.info('Registered POST /channels');

  fastify.delete(
    '/channels/:id',
    withPacked(
      withUser(channelController.deleteChannel.bind(channelController)),
    ),
  );
  fastify.log.info('Registered DELETE /channels/:id');

  fastify.patch(
    '/channels/:id',
    withPacked(channelController.updateChannel.bind(channelController)),
  );
  fastify.log.info('Registered PATCH /channels/:id');
};
