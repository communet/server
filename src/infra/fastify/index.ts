import cors from '@fastify/cors';
import { AccessViolationError, EntityNotFoundError } from '../../application';
import {
  ChannelEntity,
  ChatEntity,
  MessageEntity,
  UserEntity,
} from '../../core/entities';
import { makeResponsePlugin, NotFoundPlugin } from './plugins';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerResponse,
  mapBadRequest,
  mapChannelEntity,
  mapChatEntity,
  mapForbidden,
  mapInternalServer,
  mapMessageEntity,
  mapNotFound,
  mapUnauthorized,
  mapUserEntity,
  NotFoundResponse,
  UnauthorizedResponse,
} from './responses';
import { ChannelRouter, ChatRouter, MessageRouter, UserRouter } from './router';
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

  server.register(cors);
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
    .map(AccessViolationError, ({ targetEntity }) =>
      mapForbidden(new ForbiddenResponse(targetEntity ?? 'unknown entity')),
    )
    .map(UserEntity, mapUserEntity)
    .map(ChatEntity, mapChatEntity)
    .map(ChannelEntity, mapChannelEntity)
    .map(MessageEntity, mapMessageEntity)
    .build();

  server.register(UserRouter, API_PREFIX_V1);
  server.register(ChannelRouter, API_PREFIX_V1);
  server.register(ChatRouter, API_PREFIX_V1);
  server.register(MessageRouter, API_PREFIX_V1);

  return server.start();
}
