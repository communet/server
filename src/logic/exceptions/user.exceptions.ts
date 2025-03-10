import { LogicError } from '@/logic/exceptions/base.exceptions';

export class UserAlreadyExistsError extends LogicError {
  constructor(message: string) {
    super('UserAlreadyExists', message);
  }
}
