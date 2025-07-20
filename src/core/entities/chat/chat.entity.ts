import { Entity } from '../../abstracts';
import { StringRule } from '../../rules';
import { MessageEntity } from '../message';
import { CHAT_NAME_OPTIONS } from './constants';

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
