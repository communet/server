import { IdRule } from '../rules';

export abstract class Entity {
  protected constructor(id: string) {
    this._id = new IdRule(id);
  }

  private _id: IdRule;

  public get id(): string {
    return this._id.value;
  }
}
