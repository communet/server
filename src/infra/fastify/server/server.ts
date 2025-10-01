import fastify, {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyServerOptions,
} from 'fastify';
import { ApplicationError } from '../../../application';
import { RuleError } from '../../../core/errors';
import { BadRequestResponse, InternalServerResponse } from '../responses';
import { ServerOptions } from './types';

export class Server {
  private readonly server: FastifyInstance;

  constructor(
    options: FastifyServerOptions,
    private readonly serverOptions: ServerOptions,
  ) {
    this.server = fastify(options);

    this.server.setErrorHandler((error) => {
      if (error instanceof RuleError) {
        return new BadRequestResponse(error.rule, error.requirements);
      }

      if (error instanceof ApplicationError) {
        console.trace('Error catched', error);
        return error;
      }

      return new InternalServerResponse(error.message);
    });
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
