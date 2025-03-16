import { LogicError } from '@/logic/exceptions/base.exceptions';

export class UserAlreadyExistsError extends LogicError {
  constructor(message: string) {
    super('UserAlreadyExists', message);
  }
}

export class InvalidCredentialsError extends LogicError {
  constructor(message: string) {
    super('InvalidCredentials', message);
  }
}

export class InvalidRefreshTokenError extends LogicError {
  constructor(message: string) {
    super('InvalidRefreshToken', message);
  }
}
