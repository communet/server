import { Rule } from '../abstracts';
import { RuleError } from '../errors';
import { RULE_ERRORS } from './constants';

export class IdRule extends Rule<string> {
  constructor(
    value: string,
    readonly name: string = 'IdRule',
  ) {
    super(value);
  }

  validate(): void {
    if (this.value.length === 0) {
      this._throwError(RULE_ERRORS.EMPTY_ID);
    }
  }

  private _throwError(message: string): never {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new RuleError(this.name, message);
  }
}
