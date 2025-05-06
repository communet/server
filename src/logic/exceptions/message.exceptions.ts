import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class MessageDoesNotExistError extends ApplicationError {
  constructor(message: string) {
    super('MessageDoesNotExist', message);
  }
}
