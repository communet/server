import { FastifyInstance } from 'fastify';
import { NotFoundResponse } from '../responses';

export const NotFoundPlugin = (fastify: FastifyInstance): FastifyInstance =>
  fastify.setNotFoundHandler((req, res) =>
    res.status(404).send(new NotFoundResponse(`Endpoint ${req.url} not found`)),
  );
