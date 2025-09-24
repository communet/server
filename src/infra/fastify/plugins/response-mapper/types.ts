import { Response } from '../../responses';

// NOTE: We're doing this a lot for the generic class
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassType<T> = new (...args: any[]) => T;

export type PluginBuilder = {
  map: <T, R>(
    cls: ClassType<T>,
    fn: (value: T) => Response<R>,
  ) => PluginBuilder;
  build: () => void;
};

// NOTE: We're doing this a lot for the generic MapperCollection definition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mapper<T = any, R = any> = {
  class: ClassType<T>;
  mapper: (value: T) => Response<R>;
};

export type MapperCollection = Map<string, Mapper>;
