export abstract class Rule<T> {
  constructor(protected readonly _value: T) {
    this.validate();
  }

  get value(): T {
    return this._value;
  }

  protected abstract validate(): void;
  protected abstract get name(): string;
}
