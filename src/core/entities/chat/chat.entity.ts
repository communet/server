import { IdRule, StringRule } from '../../rules';
import { Entity } from '../../abstracts';
import { MessageEntity } from '../message';

export class ChatEntity extends Entity {
  protected readonly _name: StringRule;
  protected readonly _messages: MessageEntity[];

  constructor(id: IdRule, name: StringRule, messages?: MessageEntity[]) {
    super(id);
    this._name = name;
    this._messages = messages ?? [];
  }

  public get name(): string {
    return this._name.value;
  }

  public get messages(): MessageEntity[] {
    return this._messages;
  }
}
