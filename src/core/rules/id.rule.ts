import { Rule } from '../abstracts';
import { RuleError } from '../errors';

const RULE_ERRORS = {
  EMPTY_ID: 'id cannot be empty',
};

export class IdRule extends Rule<string> {
  readonly name = 'IdRule';

  validate(): void {
    if (this.value.length === 0) {
      this._throwError(RULE_ERRORS.EMPTY_ID);
    }
  }

  private _throwError(message: string): never {
    throw new RuleError(this.name, message);
  }
}
