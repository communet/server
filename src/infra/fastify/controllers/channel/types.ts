import { ControllerHandlerParams, WithBody, WithParam } from '../../router';

export type CreateUpdateChannelHandlerParams = WithBody<
  ControllerHandlerParams,
  { name: string }
>;

export type WithChannelId<T> = WithParam<T, 'id'>;
