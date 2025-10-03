import { ControllerHandlerParams, WithBody, WithParam } from '../../router';

type WithMessageId<T> = WithParam<T, 'id'>;

type MessageContentBody = WithBody<
  ControllerHandlerParams,
  { content: string }
>;

export type WithChatId<T> = WithParam<T, 'chatId'>;

export type SendMessageHandlerParams = WithChatId<MessageContentBody>;

export type DeleteMessageHandlerParams = WithMessageId<ControllerHandlerParams>;
