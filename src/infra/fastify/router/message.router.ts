import { FastifyInstance } from 'fastify';
import { createMessageController } from '../controllers';
import { withPacked, withUser } from './common';

export const MessageRouter = (fastify: FastifyInstance): void => {
  const messageController = createMessageController();

  fastify.get(
    '/chats/:chatId/messages',
    withPacked(messageController.getMessages.bind(messageController)),
  );
  fastify.log.info('Registered GET /chats/:chatId/messages');

  fastify.post(
    '/chats/:chatId/messages',
    withPacked(withUser(messageController.sendMessage.bind(messageController))),
  );
  fastify.log.info('Registered POST /chats/:chatId/messages');

  fastify.patch(
    '/messages/:id',
    withPacked(
      withUser(messageController.changeMessage.bind(messageController)),
    ),
  );
  fastify.log.info('Registered PATCH /messages/:id');

  fastify.delete(
    '/messages/:id',
    withPacked(messageController.deleteMessage.bind(messageController)),
  );
  fastify.log.info('Registered DELETE /messages/:id');
};
