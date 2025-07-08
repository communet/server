export abstract class Rule<T> {
  constructor(private readonly _value: T) {
    this.validate();
  }

  get value(): T {
    return this._value;
  }

  abstract validate(): void;
  abstract get name(): string;
}
