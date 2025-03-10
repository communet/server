import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class LogicError extends ApplicationError {
  constructor(name: string, message: string) {
    super(name, message);
  }
}
