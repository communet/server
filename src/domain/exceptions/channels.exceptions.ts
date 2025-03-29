import { ApplicationError } from '@/domain/exceptions/base.exceptions';

export class ChannelNameEmptyError extends ApplicationError {
  constructor(message: string) {
    super('ChannelNameEmptyError', message);
  }
}

export class ChannelNameTooShortError extends ApplicationError {
  constructor(message: string) {
    super('ChannelNameTooShortError', message);
  }
}

export class ChannelNameTooLongError extends ApplicationError {
  constructor(message: string) {
    super('ChannelNameTooLongError', message);
  }
}
