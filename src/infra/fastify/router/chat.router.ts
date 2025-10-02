import { FastifyInstance } from 'fastify';
import { createChatController } from '../controllers/chat';
import { withPacked } from './common';

export const ChatRouter = (fastify: FastifyInstance): void => {
  const chatController = createChatController();

  fastify.get(
    '/channels/:channelId/chats',
    withPacked(chatController.getAllChatsByChannelId.bind(chatController)),
  );
  fastify.log.info('Registered GET /channels/:channelId/chats');

  fastify.post(
    '/channels/:channelId/chats',
    withPacked(chatController.createChat.bind(chatController)),
  );
  fastify.log.info('Registered POST /channels/:channelId/chats');

  fastify.patch(
    '/channels/:channelId/chats/:id',
    withPacked(chatController.changeChatName.bind(chatController)),
  );
  fastify.log.info('Registered PATCH /channels/:channelId/chats/:id');

  fastify.delete(
    '/channels/:channelId/chats/:id',
    withPacked(chatController.deleteChat.bind(chatController)),
  );
  fastify.log.info('Registered DELETE /channels/:channelId/chats/:id');
};
