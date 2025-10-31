import { Entity } from '../abstracts';
import { DateRule, IdRule, StringRule } from '../../rules';
import { MESSAGE_CONTENT_OPTIONS } from './constants';
import { MessageEntityPayload } from './types';

export class MessageEntity extends Entity {
  #content: StringRule;
  readonly #createdAt: DateRule;
  readonly #senderId: IdRule;
  readonly #chatId: IdRule;

  constructor({
    id,
    content,
    senderId,
    chatId,
    createdAt,
  }: MessageEntityPayload) {
    super(id);
    this.#content = new StringRule(
      content,
      'messageContent',
      MESSAGE_CONTENT_OPTIONS,
    );
    this.#createdAt = new DateRule(createdAt ?? new Date(), 'createdAt', {
      max: new Date(),
    });
    this.#senderId = new IdRule(senderId, 'senderId');
    this.#chatId = new IdRule(chatId, 'chatId');
  }

  public get content(): string {
    return this.#content.value;
  }

  public set content(content: string) {
    this.#content = new StringRule(
      content,
      'messageContent',
      MESSAGE_CONTENT_OPTIONS,
    );
  }

  public get createdAt(): Date {
    return this.#createdAt.value;
  }

  public get senderId(): string {
    return this.#senderId.value;
  }

  public get chatId(): string {
    return this.#chatId.value;
  }
}
