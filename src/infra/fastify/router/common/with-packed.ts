import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { ControllerHandlerParams } from './types';

export const withPacked =
  <T extends RouteGenericInterface, R>(
    fn: (params: ControllerHandlerParams<T>) => R,
  ) =>
  (request: FastifyRequest<T>, reply: FastifyReply): R =>
    fn({ request, reply });
