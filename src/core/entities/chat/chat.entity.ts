import { StringRule } from '../../rules';
import { Entity } from '../../abstracts';
import { CHAT_NAME_OPTIONS } from './constants';
import { MessageEntity } from '../message';

export class ChatEntity extends Entity {
  protected readonly _name: StringRule;
  protected readonly _messages: MessageEntity[];

  constructor(id: string, name: string, messages?: MessageEntity[]) {
    super(id);
    this._name = new StringRule(name, CHAT_NAME_OPTIONS);
    this._messages = messages ?? [];
  }

  public get name(): string {
    return this._name.value;
  }

  public get messages(): MessageEntity[] {
    return this._messages;
  }
}
