import { RouteGenericInterface } from 'fastify';
import { Assert } from '../../router';

export type UserGetByIdRequest = Assert<
  {
    Params: {
      id: string;
    };
  },
  RouteGenericInterface
>;
