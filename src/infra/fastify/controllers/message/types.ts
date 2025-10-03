import { ControllerHandlerParams, WithBody, WithParam } from '../../router';

type MessageContentBody = WithBody<
  ControllerHandlerParams,
  { content: string }
>;

export type WithChatId<T> = WithParam<T, 'chatId'>;

export type SendMessageHandlerParams = WithChatId<MessageContentBody>;
