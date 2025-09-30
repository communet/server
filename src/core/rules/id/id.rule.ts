import { Rule } from '../../abstracts';
import { RuleError } from '../../errors';
import { RULE_ERRORS } from './constatnts';

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
    throw new RuleError(this.name, message);
  }
}
