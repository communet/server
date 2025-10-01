import { ApplicationError } from './application.error';

export class EntityNotFoundError extends ApplicationError {
  constructor(message: string, targetEntity?: string) {
    super(message, targetEntity);

    this.name = `[${this.name}::EntityNotFound]`;
  }
}
