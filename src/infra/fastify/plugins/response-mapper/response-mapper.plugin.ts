import { FastifyInstance, preSerializationHookHandler } from 'fastify';
import { ResponseOk } from '../../responses';
import { SUCCESS_CODE } from './constants';
import { MapperCollection, PluginBuilder } from './types';
import { getStatusCode } from './utils';

const handleResponseWithMappers =
  (mappers: MapperCollection): preSerializationHookHandler =>
  (_, reply, payload, done): void => {
    let [response] = mappers
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

    if (payload instanceof Array && payload.length === 0) {
      reply.code(SUCCESS_CODE);
      response = { data: [], error: false };
    } else {
      if (response instanceof Array) {
        reply.code(SUCCESS_CODE);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response = (response as ResponseOk<any>[]).reduce(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          (acc, r) => ({ error: false, data: [...acc.data, r.data] }),
          { data: [], error: false },
        );
      } else {
        reply.code(getStatusCode(response));
      }
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
