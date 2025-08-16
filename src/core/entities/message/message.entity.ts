import { Entity } from '../../abstracts';
import { IdRule, StringRule } from '../../rules';
import { MESSAGE_BODY_OPTIONS } from './constants';
import { MessageEntityPayload } from './types';

export class MessageEntity extends Entity {
  private _body: StringRule;
  // FIXME: this should be a rule class
  private readonly _createdAt: Date;
  private readonly _senderId: IdRule;
  private readonly _chatId: IdRule;

  constructor({ id, body, senderId, chatId, createdAt }: MessageEntityPayload) {
    super(id);
    this._body = new StringRule(body, MESSAGE_BODY_OPTIONS);
    this._createdAt = createdAt ?? new Date();
    this._senderId = new IdRule(senderId);
    this._chatId = new IdRule(chatId);
  }

  public get body(): string {
    return this._body.value;
  }

  public set body(body: string) {
    this._body = new StringRule(body, MESSAGE_BODY_OPTIONS);
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get senderId(): string {
    return this._senderId.value;
  }

  public get chatId(): string {
    return this._chatId.value;
  }
}
