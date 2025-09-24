import { NotFoundPlugin } from './plugins';
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
  server.register(UserRouter, API_PREFIX_V1);

  return server.start();
}
