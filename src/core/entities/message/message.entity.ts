import { Entity } from '../../abstracts';
import { DateRule, IdRule, StringRule } from '../../rules';
import { MESSAGE_CONTENT_OPTIONS } from './constants';
import { MessageEntityPayload } from './types';

export class MessageEntity extends Entity {
  private _content: StringRule;
  private readonly _createdAt: DateRule;
  private readonly _senderId: IdRule;
  private readonly _chatId: IdRule;

  constructor({
    id,
    content,
    senderId,
    chatId,
    createdAt,
  }: MessageEntityPayload) {
    super(id);
    this._content = new StringRule(
      content,
      'messageContent',
      MESSAGE_CONTENT_OPTIONS,
    );
    this._createdAt = new DateRule(createdAt ?? new Date(), 'createdAt');
    this._senderId = new IdRule(senderId, 'senderId');
    this._chatId = new IdRule(chatId, 'chatId');
  }

  public get content(): string {
    return this._content.value;
  }

  public set content(content: string) {
    this._content = new StringRule(
      content,
      'messageContent',
      MESSAGE_CONTENT_OPTIONS,
    );
  }

  public get createdAt(): Date {
    return this._createdAt.value;
  }

  public get senderId(): string {
    return this._senderId.value;
  }

  public get chatId(): string {
    return this._chatId.value;
  }
}
