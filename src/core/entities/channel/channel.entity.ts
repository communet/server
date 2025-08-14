import { Entity } from '../../abstracts';
import { StringRule } from '../../rules';
import { ChatEntity } from '../chat';
import { CHANNEL_NAME_OPTIONS } from './constants';

export class ChannelEntity extends Entity {
  private readonly _name: StringRule;
  private readonly _chats: ChatEntity[];
  private readonly _creatorId: string;
  // TODO: добавить идентификатор создателя

  constructor(
    id: string,
    name: string,
    creatorId: string,
    chats?: ChatEntity[],
  ) {
    super(id);
    this._name = new StringRule(name, CHANNEL_NAME_OPTIONS);
    this._creatorId = creatorId;
    this._chats = chats ?? [];
  }

  public get name(): string {
    return this._name.value;
  }

  public get chats(): ChatEntity[] {
    return this._chats;
  }

  public get creatorId(): string {
    return this._creatorId;
  }
}
