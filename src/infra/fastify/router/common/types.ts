import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { UserEntity } from '../../../../core/entities';

export type ControllerHandlerParams<
  Request extends RouteGenericInterface = RouteGenericInterface,
> = {
  request: FastifyRequest<Request>;
  reply: FastifyReply;
};

export type WithUser<T> = T & {
  user: UserEntity;
};
