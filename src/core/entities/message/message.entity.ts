import { Entity } from '../../abstracts';
import { StringRule } from '../../rules';
import { MESSAGE_BODY_OPTIONS } from './constants';

export class MessageEntity extends Entity {
  // TODO: добавить идентификатор создателя
  protected readonly _body: StringRule;
  protected readonly _createdAt: Date;

  constructor(id: string, body: string, createdAt?: Date) {
    super(id);
    this._body = new StringRule(body, MESSAGE_BODY_OPTIONS);
    this._createdAt = createdAt ?? new Date();
  }

  public get body(): string {
    return this._body.value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
