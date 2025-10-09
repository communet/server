import { Rule } from '../../abstracts';
import { RuleError } from '../../errors';
import { RULE_ERRORS } from './constants';

export class DateRule extends Rule<Date> {
  constructor(
    value: Date,
    readonly name: string = 'DateRule',
  ) {
    super(value);
  }

  validate(): void {
    const now = new Date();

    if (this._value.getTime() > now.getTime()) {
      this._throwError(RULE_ERRORS.INVALID_FUTURE_DATE);
    }
  }

  private _throwError(message: string): never {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new RuleError(this.name, message);
  }
}
