import { FastifyInstance } from 'fastify';
import { createChatController } from '../controllers';
import { withPacked, withUser } from './common';

export const ChatRouter = (fastify: FastifyInstance): void => {
  const chatController = createChatController();

  fastify.get(
    '/channels/:channelId/chats',
    withPacked(chatController.getAllChatsByChannelId.bind(chatController)),
  );
  fastify.log.info('Registered GET /channels/:channelId/chats');

  fastify.post(
    '/channels/:channelId/chats',
    withPacked(withUser(chatController.createChat.bind(chatController))),
  );
  fastify.log.info('Registered POST /channels/:channelId/chats');

  fastify.patch(
    '/channels/:channelId/chats/:id',
    withPacked(withUser(chatController.changeChatName.bind(chatController))),
  );
  fastify.log.info('Registered PATCH /channels/:channelId/chats/:id');

  fastify.delete(
    '/channels/:channelId/chats/:id',
    withPacked(withUser(chatController.deleteChat.bind(chatController))),
  );
  fastify.log.info('Registered DELETE /channels/:channelId/chats/:id');
};
