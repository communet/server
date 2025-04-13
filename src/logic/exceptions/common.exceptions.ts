import { LogicError } from '@/logic/exceptions/base.exceptions';

export class InvalidFileExtensionError extends LogicError {
  constructor(message: string) {
    super('InvalidFileExtension', message);
  }
}
