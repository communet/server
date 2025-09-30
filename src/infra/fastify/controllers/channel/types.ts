import { ControllerHandlerParams } from '../../router';

export type CreateUpdateChannelHandlerParams = ControllerHandlerParams<{
  Body: {
    name: string;
  };
}>;

type ExtractGeneric<T> = T extends ControllerHandlerParams<infer R> ? R : T;

export type WithChannelId<T> = ControllerHandlerParams<
  {
    Params: {
      id: string;
    };
  } & ExtractGeneric<T>
>;
