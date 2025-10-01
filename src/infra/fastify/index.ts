import { EntityNotFoundError } from '../../application';
import { ChannelEntity, ChatEntity, UserEntity } from '../../core/entities';
import { makeResponsePlugin, NotFoundPlugin } from './plugins';
import {
  BadRequestResponse,
  InternalServerResponse,
  mapBadRequest,
  mapChannelEntity,
  mapChatEntity,
  mapInternalServer,
  mapNotFound,
  mapUnauthorized,
  mapUserEntity,
  NotFoundResponse,
  UnauthorizedResponse,
} from './responses';
import { ChannelRouter, UserRouter } from './router';
import { ChatRouter } from './router/chat.router';
import { Server } from './server';
import { API_PREFIX_V1 } from './server/constants';

export function startServer(): Promise<string> {
  const server = new Server(
    {
      ignoreTrailingSlash: true,
      logger: {
        transport: {
          target: 'pino-pretty',
        },
      },
    },
    { port: 3333 },
  );

  server.register(NotFoundPlugin);

  makeResponsePlugin(server.fastify)
    .map(UnauthorizedResponse, mapUnauthorized)
    .map(NotFoundResponse, mapNotFound)
    .map(BadRequestResponse, mapBadRequest)
    .map(InternalServerResponse, mapInternalServer)
    .map(EntityNotFoundError, ({ targetEntity }) =>
      mapNotFound(
        new NotFoundResponse(
          ...(targetEntity
            ? [targetEntity, 'not found']
            : ['unknown entity', 'not found']),
        ),
      ),
    )
    .map(UserEntity, mapUserEntity)
    .map(ChatEntity, mapChatEntity)
    .map(ChannelEntity, mapChannelEntity)
    .build();

  server.register(UserRouter, API_PREFIX_V1);
  server.register(ChannelRouter, API_PREFIX_V1);
  server.register(ChatRouter, API_PREFIX_V1);

  return server.start();
}
