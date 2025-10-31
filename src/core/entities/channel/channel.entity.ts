import { Entity } from '../abstracts';
import { IdRule, StringRule } from '../../rules';
import { ChatEntity } from '../chat';
import { CHANNEL_NAME_OPTIONS } from './constants';

export class ChannelEntity extends Entity {
  #name: StringRule;
  readonly #chats: ChatEntity[];
  readonly #creatorId: IdRule;
  // TODO: добавить идентификатор создателя

  constructor(
    id: string,
    name: string,
    creatorId: string,
    chats?: ChatEntity[],
  ) {
    super(id);
    this.#name = new StringRule(name, 'channelName', CHANNEL_NAME_OPTIONS);
    this.#creatorId = new IdRule(creatorId, 'creatorId');
    this.#chats = chats ?? [];
  }

  public get name(): string {
    return this.#name.value;
  }

  public set name(name: string) {
    this.#name = new StringRule(name, 'channelName', CHANNEL_NAME_OPTIONS);
  }

  public get chats(): ChatEntity[] {
    return this.#chats;
  }

  public get creatorId(): string {
    return this.#creatorId.value;
  }
}
