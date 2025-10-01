import { ControllerHandlerParams, WithBody, WithParam } from '../../router';

export type WithChannelId<T> = WithParam<T, 'channelId'>;
export type WithChatId<T> = WithParam<T, 'id'>;

export type CreateChatHandlerParams = WithBody<
  WithChannelId<ControllerHandlerParams>,
  {
    name: string;
  }
>;

export type UpdateChatHandlerParams = WithChatId<CreateChatHandlerParams>;
