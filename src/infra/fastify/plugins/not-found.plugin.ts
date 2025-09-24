import { FastifyInstance } from 'fastify';
import { createNotFoundResponse } from '../controllers/response';

export const NotFoundPlugin = (fastify: FastifyInstance): void => {
  fastify.setNotFoundHandler((req, res) => {
    res
      .status(404)
      .send(createNotFoundResponse(`Endpoint ${req.url} not found`));
  });
};
