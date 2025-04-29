import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class ChatNameEmptyError extends ApplicationError {
  constructor(message: string) {
    super('ChatNameEmptyError', message);
  }
}

export class ChatNameTooShortError extends ApplicationError {
  constructor(message: string) {
    super('ChatNameTooShortError', message);
  }
}

export class ChatNameTooLongError extends ApplicationError {
  constructor(message: string) {
    super('ChatNameTooLongError', message);
  }
}

export class ChatTypeEmptyError extends ApplicationError {
  constructor(message: string) {
    super('ChatTypeEmptyError', message);
  }
}

export class InvalidChatTypeError extends ApplicationError {
  constructor(message: string) {
    super('InvalidChatTypeError', message);
  }
}
