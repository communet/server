import { Rule } from '../../abstracts';
import { RuleError } from '../../errors';
import { RULE_ERRORS } from './constants';
import { StringRuleOptions } from './types';

export class StringRule extends Rule<string> {
  constructor(_value: string, options?: StringRuleOptions) {
    super(_value);

    this._maxLength = options?.max;
    this._minLength = options?.min;
    this._regex = options?.regex;

    this.validate();
  }

  readonly name = '';

  private _maxLength?: number;
  private _minLength?: number;
  private _regex?: RegExp;

  validate(): void {
    if (this._maxLength !== undefined && this._value.length > this._maxLength) {
      throw new RuleError(
        this.name,
        `${RULE_ERRORS.INVALID_LENGTH.SHOULD_BE_LOWER_THAN} ${this._maxLength}`,
      );
    }
    if (this._minLength !== undefined && this._value.length < this._minLength) {
      throw new RuleError(
        this.name,
        `${RULE_ERRORS.INVALID_LENGTH.SHOULD_BE_HIGHER_THAN} ${this._minLength}`,
      );
    }
    if (this._regex !== undefined && !this._regex.test(this._value)) {
      throw new RuleError(this.name, RULE_ERRORS.INVALID_FORMAT);
    }
  }
}
