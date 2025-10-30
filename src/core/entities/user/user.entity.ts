import { StringRule } from '../../rules';
import { Entity } from '../abstracts';
import { USERNAME_RULE_OPTIONS } from './constants';

export class UserEntity extends Entity {
  constructor(id: string, username: string) {
    super(id);
    this.#username = new StringRule(
      username,
      'username',
      USERNAME_RULE_OPTIONS,
    );
  }

  #username: StringRule;

  public get username(): string {
    return this.#username.value;
  }
}
