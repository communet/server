import { Entity } from '../abstracts';
import { IdRule, StringRule } from '../../rules';
import { ChatEntity } from '../chat';
import { CHANNEL_NAME_OPTIONS } from './constants';

export class ChannelEntity extends Entity {
  private _name: StringRule;
  private readonly _chats: ChatEntity[];
  private readonly _creatorId: IdRule;
  // TODO: добавить идентификатор создателя

  constructor(
    id: string,
    name: string,
    creatorId: string,
    chats?: ChatEntity[],
  ) {
    super(id);
    this._name = new StringRule(name, 'channelName', CHANNEL_NAME_OPTIONS);
    this._creatorId = new IdRule(creatorId, 'creatorId');
    this._chats = chats ?? [];
  }

  public get name(): string {
    return this._name.value;
  }

  public set name(name: string) {
    this._name = new StringRule(name, 'channelName', CHANNEL_NAME_OPTIONS);
  }

  public get chats(): ChatEntity[] {
    return this._chats;
  }

  public get creatorId(): string {
    return this._creatorId.value;
  }
}
