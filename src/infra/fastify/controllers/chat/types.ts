import { ControllerHandlerParams, WithBody, WithParam } from '../../router';

type WithChatId<T> = WithParam<T, 'id'>;
type ChatNameBody = WithBody<ControllerHandlerParams, { name: string }>;
export type WithChannelId<T> = WithParam<T, 'channelId'>;

export type CreateChatHandlerParams = WithChannelId<ChatNameBody>;

export type UpdateDeleteChatHandlerParams = WithChatId<ChatNameBody>;
