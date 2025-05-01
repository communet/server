import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class UserDoesNotJoinedToChannelError extends ApplicationError {
  constructor(message: string) {
    super('UserDoesNotJoinedToChannel', message);
  }
}

export class ChatDoesNotExistError extends ApplicationError {
  constructor(message: string) {
    super('ChatDoesNotExist', message);
  }
}
