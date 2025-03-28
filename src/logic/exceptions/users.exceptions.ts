import { LogicError } from '@/logic/exceptions/base.exceptions';

export class UserDoesNotExistError extends LogicError {
  constructor(message: string) {
    super('UserDoesNotExist', message);
  }
}
