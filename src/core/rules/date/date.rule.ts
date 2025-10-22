import { Rule } from '../abstracts';
import { RuleError } from '../errors';
import { RULE_ERRORS } from './constants';
import { DateRuleOptions } from './types';

export class DateRule extends Rule<Date> {
  constructor(
    value: Date,
    readonly name: string = 'DateRule',
    options?: DateRuleOptions,
  ) {
    super(value);

    this._max = options?.max;

    this.validate();
  }

  private readonly _max?: Date;

  validate(): void {
    if (
      this._max !== undefined &&
      this._value.getTime() > this._max.getTime()
    ) {
      this._throwError(RULE_ERRORS.INVALID_FUTURE_DATE);
    }
  }

  private _throwError(message: string): never {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new RuleError(this.name, message);
  }
}
