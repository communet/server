import { FastifyInstance } from 'fastify';
import { createMessageController } from '../controllers';
import { withPacked, withUser } from './common';

export const MessageRouter = (fastify: FastifyInstance): void => {
  const messageController = createMessageController();

  fastify.post(
    '/chats/:chatId/messages',
    withPacked(withUser(messageController.sendMessage.bind(messageController))),
  );
  fastify.log.info('Registerd POST /chats/:chatId/messages');
};
