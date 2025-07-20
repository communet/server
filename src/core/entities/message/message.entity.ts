import { IdRule, StringRule } from '../../rules';
import { Entity } from '../../abstracts';

export class MessageEntity extends Entity {
  // TODO: добавить идентификатор создателя
  protected readonly _body: StringRule;
  protected readonly _createdAt: Date;

  constructor(id: IdRule, body: StringRule, createdAt?: Date) {
    super(id);
    this._body = body;
    this._createdAt = createdAt ?? new Date();
  }

  public get body(): string {
    return this._body.value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
