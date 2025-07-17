import { Entity } from '../../abstracts';
import { StringRule } from '../../rules';
import { CHANNEL_NAME_OPTIONS } from './constants';
import { ChatEntity } from '../chat';

export class ChannelEntity extends Entity {
  protected readonly _name: StringRule;
  protected readonly _chats: ChatEntity[];
  // TODO: добавить идентификатор создателя

  constructor(id: string, name: string, chats?: ChatEntity[]) {
    super(id);
    this._name = new StringRule(name, CHANNEL_NAME_OPTIONS);
    this._chats = chats ?? [];
  }

  public get name(): string {
    return this._name.value;
  }

  public get chats(): ChatEntity[] {
    return this._chats;
  }
}
