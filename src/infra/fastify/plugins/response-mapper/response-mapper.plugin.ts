import { FastifyInstance, preSerializationHookHandler } from 'fastify';
import { MapperCollection, PluginBuilder } from './types';
import { SUCCESS_CODE, getStatusCode } from './utils';

const handleResponseWithMappers =
  (mappers: MapperCollection): preSerializationHookHandler =>
  (_, reply, payload, done): void => {
    const [response] = mappers
      .entries()
      .filter(([, mapper]) =>
        payload instanceof Array
          ? payload.some((p) => p instanceof mapper.class)
          : payload instanceof mapper.class,
      )
      .take(1)
      .map(([, mapper]) =>
        payload instanceof Array
          ? payload.map(mapper.mapper)
          : mapper.mapper(payload),
      )
      .toArray();

    if (response instanceof Array) {
      reply.code(SUCCESS_CODE);
    } else {
      reply.code(getStatusCode(response));
    }

    done(null, response);
  };

export const makeResponsePlugin = (fastify: FastifyInstance): PluginBuilder => {
  const mappers: MapperCollection = new Map();

  const builder: PluginBuilder = {
    map: (cls, fn) => {
      const key = `M#${cls.name}`;

      mappers.set(key, {
        class: cls,
        mapper: fn,
      });

      fastify.log.info(`Registered mapper ${key}`);

      return builder;
    },

    build: () =>
      fastify.addHook('preSerialization', handleResponseWithMappers(mappers)),
  };

  return builder;
};
