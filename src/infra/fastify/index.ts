import { ChannelEntity, UserEntity } from '../../core/entities';
import { makeResponsePlugin, NotFoundPlugin } from './plugins';
import {
  mapChannelEntity,
  mapNotFound,
  mapUnauthorized,
  mapUserEntity,
  NotFoundResponse,
  UnauthorizedResponse,
} from './responses';
import { ChannelRouter, UserRouter } from './router';
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
    .map(UserEntity, mapUserEntity)
    .map(ChannelEntity, mapChannelEntity)
    .build();

  server.register(UserRouter, API_PREFIX_V1);
  server.register(ChannelRouter, API_PREFIX_V1);

  return server.start();
}
