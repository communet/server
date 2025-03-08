export abstract class BaseValue<VT> {
  protected value: VT;

  constructor(value: VT) {
    this.value = value;
    this.validate();
  }

  public getValue(): VT {
    return this.value;
  }

  protected abstract validate(): undefined;
}
