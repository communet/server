import { ControllerHandlerParams, WithBody, WithParam } from '../../router';

type WithMessageId<T> = WithParam<T, 'id'>;

type MessageContentBody = WithBody<
  ControllerHandlerParams,
  { content: string }
>;

export type WithChannelId<T> = WithParam<T, 'channelId'>;

export type WithChatId<T> = WithParam<T, 'chatId'>;

export type WithChannelChatIds<T> = WithChannelId<WithChatId<T>>;

export type WithChannelChatMessageIds<T> = WithChannelChatIds<WithMessageId<T>>;

export type GetMessagesHandlerParams =
  WithChannelChatIds<ControllerHandlerParams>;

export type SendMessageHandlerParams = WithChannelChatIds<MessageContentBody>;

export type ChangeMessageHandlerParams =
  WithChannelChatMessageIds<MessageContentBody>;

export type DeleteMessageHandlerParams =
  WithChannelChatMessageIds<ControllerHandlerParams>;
