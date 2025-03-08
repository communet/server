import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class UsernameEmptyError extends ApplicationError {
  constructor(message: string) {
    super('UsernameEmptyError', message);
  }
}

export class UsernameTooShortError extends ApplicationError {
  constructor(message: string) {
    super('UsernameTooShortError', message);
  }
}

export class UsernameTooLongError extends ApplicationError {
  constructor(message: string) {
    super('UsernameTooLongError', message);
  }
}

export class InvalidUsernameFormatError extends ApplicationError {
  constructor(message: string) {
    super('InvalidUsernameFormatError', message);
  }
}

export class EmailEmptyError extends ApplicationError {
  constructor(message: string) {
    super('EmailEmptyException', message);
  }
}

export class InvalidEmailFormatError extends ApplicationError {
  constructor(message: string) {
    super('InvalidEmailFormatError', message);
  }
}

export class EmptyPasswordError extends ApplicationError {
  constructor(message: string) {
    super('EmptyPasswordError', message);
  }
}
