import { LogicError } from '@/logic/exceptions/base.exceptions';

export class ChannelDoesNotExistError extends LogicError {
  constructor(message: string) {
    super('ChannelDoesNotExist', message);
  }
}
