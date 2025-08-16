import { Entity } from '../../abstracts';
import { IdRule, StringRule } from '../../rules';
import { MessageEntity } from '../message';
import { CHAT_NAME_OPTIONS } from './constants';

export class ChatEntity extends Entity {
  private _name: StringRule;
  private readonly _messages: MessageEntity[];
  private readonly _channelId: IdRule;

  constructor(
    id: string,
    name: string,
    channelId: string,
    messages?: MessageEntity[],
  ) {
    super(id);
    this._name = new StringRule(name, CHAT_NAME_OPTIONS);
    this._messages = messages ?? [];
    this._channelId = new IdRule(channelId);
  }

  public get name(): string {
    return this._name.value;
  }

  public set name(name: string) {
    this._name = new StringRule(name, CHAT_NAME_OPTIONS);
  }

  public get messages(): MessageEntity[] {
    return this._messages;
  }

  public get channelId(): string {
    return this._channelId.value;
  }
}
