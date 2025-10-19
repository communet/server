import { ApplicationError } from './application.error';

export class PolicyViolationError extends ApplicationError {
  constructor(message: string, targetEntity?: string) {
    super(message, targetEntity);

    this.name = `[${this.name}::PolicyViolation]`;
  }
}
