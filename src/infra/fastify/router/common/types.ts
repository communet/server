import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { UserEntity } from '../../../../core/entities';

export type ControllerHandlerParams<
  R extends RouteGenericInterface = RouteGenericInterface,
> = {
  request: FastifyRequest<R>;
  reply: FastifyReply<R>;
};

export type WithUser<T> = T & {
  user: UserEntity;
};
