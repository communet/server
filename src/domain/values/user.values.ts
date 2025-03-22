import { BaseValue } from '@/domain/values/base.values';
import {
  DisplayNameEmptyError,
  DisplayNameTooLongError,
  DisplayNameTooShortError,
  EmailEmptyError,
  EmptyPasswordError,
  InvalidEmailFormatError,
  InvalidUsernameFormatError,
  UsernameEmptyError,
  UsernameTooLongError,
  UsernameTooShortError,
} from '@/domain/exceptions/user.exceptions';

export class Username extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    const regExp = /^[a-zA-Z0-9_]*$/;
    const min_length = 3;
    const max_length = 32;

    if (!this.value) {
      throw new UsernameEmptyError('Username cannot be empty');
    }
    if (this.value.length < min_length) {
      throw new UsernameTooShortError(
        `Username must be greater or equal to ${min_length} characters`,
      );
    }
    if (this.validate.length > max_length) {
      throw new UsernameTooLongError(
        `Username must be less or equal to ${max_length} characters`,
      );
    }
    if (!regExp.test(this.value)) {
      throw new InvalidUsernameFormatError('Username has an invalid format');
    }
  }
}

export class Email extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    const regExp: RegExp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/g;

    if (!this.value) {
      throw new EmailEmptyError('Email cannot be empty');
    }
    if (!regExp.test(this.value)) {
      throw new InvalidEmailFormatError('Email has an invalid format');
    }
  }
}

export class Password extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    if (!this.value) {
      throw new EmptyPasswordError('Password cannot be empty');
    }
  }
}

export class DisplayName extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    const min_length = 3;
    const max_length = 32;

    if (!this.value) {
      throw new DisplayNameEmptyError('Display name cannot be empty');
    }
    if (this.value.length < min_length) {
      throw new DisplayNameTooShortError(
        `Display name must be greater or equal to ${min_length} characters`,
      );
    }
    if (this.validate.length > max_length) {
      throw new DisplayNameTooLongError(
        `Display name must be less or equal to ${max_length} characters`,
      );
    }
  }
}
