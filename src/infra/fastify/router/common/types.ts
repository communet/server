import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { UserEntity } from '../../../../core/entities';

export type ControllerHandlerParams<
  R extends RouteGenericInterface = RouteGenericInterface,
> = {
  request: FastifyRequest<R>;
  reply: FastifyReply<R>;
};

export type Assert<T extends Expected, Expected> = T;

export type WithUser<T> = T & {
  user: UserEntity;
};
