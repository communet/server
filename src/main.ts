import fastify from 'fastify';

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

server.get('/', (): object => {
  return { hello: 'world' };
});

const start = async (): Promise<void> => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start().catch(server.log.error);
