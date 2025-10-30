import { Entity } from '../abstracts';
import { IdRule, StringRule } from '../../rules';
import { MessageEntity } from '../message';
import { CHAT_NAME_OPTIONS } from './constants';

export class ChatEntity extends Entity {
  #name: StringRule;
  readonly #messages: MessageEntity[];
  readonly #channelId: IdRule;

  constructor(
    id: string,
    name: string,
    channelId: string,
    messages?: MessageEntity[],
  ) {
    super(id);
    this.#name = new StringRule(name, 'chatName', CHAT_NAME_OPTIONS);
    this.#messages = messages ?? [];
    this.#channelId = new IdRule(channelId, 'channelId');
  }

  public get name(): string {
    return this.#name.value;
  }

  public set name(name: string) {
    this.#name = new StringRule(name, 'chatName', CHAT_NAME_OPTIONS);
  }

  public get messages(): MessageEntity[] {
    return this.#messages;
  }

  public get channelId(): string {
    return this.#channelId.value;
  }
}
