import fastify, {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyServerOptions,
} from 'fastify';
import { API_PREFIX_V1 } from './constants';
import { ServerOptions } from './types';

export class Server {
  private readonly server: FastifyInstance;

  constructor(
    options: FastifyServerOptions,
    private readonly serverOptions: ServerOptions,
  ) {
    this.server = fastify(options);
  }

  register(plugin: FastifyPluginCallback): void {
    this.server.register(plugin, { prefix: API_PREFIX_V1 });
  }

  async start(): Promise<string> {
    let result: string;
    try {
      result = await this.server.listen({
        port: this.serverOptions.port,
        host: this.serverOptions.host,
      });
    } catch (err) {
      this.server.log.error(err);

      throw new Error('Failed to start server');
    }

    return result;
  }
}
