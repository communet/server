import { StringRule } from '../../rules';
import { Entity } from '../../abstracts';
import { CHAT_NAME_OPTIONS } from './constants';

export class ChatEntity extends Entity {
  protected readonly _name: StringRule;
  // TODO: добавить список сообщений

  constructor(id: string, name: string) {
    super(id);
    this._name = new StringRule(name, CHAT_NAME_OPTIONS);
  }

  public get name(): string {
    return this._name.value;
  }
}
