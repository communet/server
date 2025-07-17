import { Entity } from '../../abstracts';
import { StringRule } from '../../rules';
import { CHANNEL_NAME_OPTIONS } from './constants';

export class ChannelEntity extends Entity {
  protected readonly _name: StringRule;
  // TODO: добавить список чатов
  // TODO: добавить идентификатор создателя

  constructor(id: string, name: string, isDeleted?: boolean) {
    super(id, isDeleted);
    this._name = new StringRule(name, CHANNEL_NAME_OPTIONS);
  }

  public get name(): string {
    return this._name.value;
  }
}
