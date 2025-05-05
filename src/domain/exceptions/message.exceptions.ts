import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class MessageEmptyError extends ApplicationError {
  constructor(message: string) {
    super('MessageEmptyError', message);
  }
}

export class MessageTooLongError extends ApplicationError {
  constructor(message: string) {
    super('MessageTooLongError', message);
  }
}
