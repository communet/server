import { IdRule } from '../../rules';

export abstract class Entity {
  protected readonly _id: IdRule;

  protected constructor(id: string) {
    this._id = new IdRule(id);
  }

  public get id(): string {
    return this._id.value;
  }
}
