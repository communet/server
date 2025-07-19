import { Entity } from '../../abstracts';
import { IdRule, StringRule } from '../../rules';
import { ChatEntity } from '../chat';

export class ChannelEntity extends Entity {
  protected readonly _name: StringRule;
  protected readonly _chats: ChatEntity[];
  // TODO: добавить идентификатор создателя

  constructor(id: IdRule, name: StringRule, chats?: ChatEntity[]) {
    super(id);
    this._name = name;
    this._chats = chats ?? [];
  }

  public get name(): string {
    return this._name.value;
  }

  public get chats(): ChatEntity[] {
    return this._chats;
  }
}
