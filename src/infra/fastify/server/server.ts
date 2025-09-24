import fastify, {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyServerOptions,
} from 'fastify';
import { ServerOptions } from './types';

export class Server {
  private readonly server: FastifyInstance;

  constructor(
    options: FastifyServerOptions,
    private readonly serverOptions: ServerOptions,
  ) {
    this.server = fastify(options);
  }

  register(plugin: FastifyPluginCallback, prefix?: string): void {
    this.server.register(plugin, { prefix });
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

  get fastify(): Readonly<FastifyInstance> {
    return this.server;
  }
}
