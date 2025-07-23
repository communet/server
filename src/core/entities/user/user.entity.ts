import { Entity } from '../../abstracts';
import { StringRule } from '../../rules';
import { USERNAME_RULE_OPTIONS } from './constants';

export class UserEntity extends Entity {
  constructor(id: string, username: string) {
    super(id);
    this._username = new StringRule(username, USERNAME_RULE_OPTIONS);
  }

  private _username: StringRule;

  public get username(): string {
    return this._username.value;
  }
}
