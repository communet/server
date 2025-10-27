import { FastifyInstance } from 'fastify';
import { createMessageController } from '../controllers';
import { withPacked, withUser } from './common';

export const MessageRouter = (fastify: FastifyInstance): void => {
  const messageController = createMessageController();

  fastify.get(
    '/channels/:channelId/chats/:chatId/messages',
    withPacked(withUser(messageController.getMessages.bind(messageController))),
  );
  fastify.log.info(
    'Registered GET /channels/:channelId/chats/:chatId/messages',
  );

  fastify.post(
    '/channels/:channelId/chats/:chatId/messages',
    withPacked(withUser(messageController.sendMessage.bind(messageController))),
  );
  fastify.log.info(
    'Registered POST /channels/:channelId/chats/:chatId/messages',
  );

  fastify.patch(
    '/channels/:channelId/chats/:chatId/messages/:id',
    withPacked(
      withUser(messageController.changeMessage.bind(messageController)),
    ),
  );
  fastify.log.info(
    'Registered PATCH /channels/:channelId/chats/:chatId/messages/:id',
  );

  fastify.delete(
    '/channels/:channelId/chats/:chatId/messages/:id',
    withPacked(
      withUser(messageController.deleteMessage.bind(messageController)),
    ),
  );
  fastify.log.info(
    'Registered DELETE /channels/:channelId/chats/:chatId/messages/:id',
  );
};
