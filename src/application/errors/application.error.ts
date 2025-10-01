export abstract class ApplicationError {
  constructor(
    message: string,
    public targetEntity?: string,
  ) {
    this.name = 'ApplicationError';
    this.message = `${this.name}: ${message}`;
  }

  public name: string;
  public message: string;
}
