import fastify from 'fastify';

const server = fastify();

server.get('/', (): object => {
  return { hello: 'world' };
});

const start = async (): Promise<void> => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start().catch(server.log.error);
