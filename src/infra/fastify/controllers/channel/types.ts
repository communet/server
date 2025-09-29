import { RouteGenericInterface } from 'fastify';
import { Assert } from '../../router';

export type CreateChannelRequest = Assert<
  {
    Body: {
      name: string;
    };
  },
  RouteGenericInterface
>;
