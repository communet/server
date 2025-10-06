import { Entity } from '../../abstracts';
import { IdRule, StringRule } from '../../rules';
import { MESSAGE_CONTENT_OPTIONS } from './constants';
import { MessageEntityPayload } from './types';

export class MessageEntity extends Entity {
  private _content: StringRule;
  // FIXME: this should be a rule class
  private readonly _createdAt: Date;
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
    this._createdAt = createdAt ?? new Date();
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
    return this._createdAt;
  }

  public get senderId(): string {
    return this._senderId.value;
  }

  public get chatId(): string {
    return this._chatId.value;
  }
}
