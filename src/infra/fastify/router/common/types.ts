import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { UserEntity } from '../../../../core/entities';

export type ControllerHandlerParams<
  R extends RouteGenericInterface = RouteGenericInterface,
> = {
  request: FastifyRequest<R>;
  reply: FastifyReply<R>;
};

type ExtractRouteGenericFromParams<T> =
  T extends ControllerHandlerParams<infer R> ? R : T;

export type WithParam<T, Param extends string = never> = string extends Param
  ? never
  : ControllerHandlerParams<
      {
        Params: {
          [K in Param]: string;
        };
      } & ExtractRouteGenericFromParams<T>
    >;

export type WithBody<T, Body extends object> = ControllerHandlerParams<
  {
    Body: Body;
  } & ExtractRouteGenericFromParams<T>
>;

export type WithUser<T> = T & {
  user: UserEntity;
};
