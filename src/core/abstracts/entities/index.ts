import { IdRule } from '../../rules';

export abstract class Entity {
  protected readonly _id: IdRule;
  protected readonly _isDeleted: boolean;

  protected constructor(id: string, isDeleted?: boolean) {
    this._id = new IdRule(id);
    this._isDeleted = Boolean(isDeleted);
  }

  public get id(): string {
    return this._id.value;
  }

  public get isDeleted(): boolean {
    return this._isDeleted;
  }
}
