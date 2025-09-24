import { UserEntity } from '../../core/entities';
import { makeResponsePlugin, NotFoundPlugin } from './plugins';
import { NotFoundResponse } from './responses';
import { mapNotFound } from './responses/not-found/not-found.response';
import { mapUserEntity } from './responses/user/user-entity';
import { UserRouter } from './router';
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
    .map(NotFoundResponse, mapNotFound)
    .map(UserEntity, mapUserEntity)
    .build();

  server.register(UserRouter, API_PREFIX_V1);

  return server.start();
}
