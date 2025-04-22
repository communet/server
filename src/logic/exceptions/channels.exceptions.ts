import { LogicError } from '@/logic/exceptions/base.exceptions';

export class ChannelDoesNotExistError extends LogicError {
  constructor(message: string) {
    super('ChannelDoesNotExist', message);
  }
}

export class UserAlreadyConnectedError extends LogicError {
  constructor() {
    super(
      'UserAlreadyConnected',
      'User already connected to channel with given id',
    );
  }
}

export class UserAlreadyDisconnectedFromChannelError extends LogicError {
  constructor() {
    super(
      'UserAlreadyDisconnectedFromChannel',
      'User already disconnected from channel with given id',
    );
  }
}
