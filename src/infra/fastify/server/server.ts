import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { ApplicationError } from '../../../application';
import { RuleError } from '../../../core/rules';
import { BadRequestResponse, InternalServerResponse } from '../responses';
import { ServerOptions } from './types';

const BODY_LIMIT = 30 * 1024 * 1024; // 30 MB

export class Server {
  constructor(
    options: FastifyServerOptions,
    private readonly serverOptions: ServerOptions,
  ) {
    this.server = fastify({ ...options, bodyLimit: BODY_LIMIT });

    this.server.setErrorHandler((error) => {
      if (error instanceof RuleError) {
        return new BadRequestResponse(error.rule, error.requirements);
      }

      if (error instanceof ApplicationError) {
        console.trace('Error caught', error);
        return error;
      }

      console.error(error);
      return new InternalServerResponse(error.message);
    });

    this.register = this.server.register.bind(this.server);
  }

  private readonly server: FastifyInstance;

  public readonly register: FastifyInstance['register'];

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
