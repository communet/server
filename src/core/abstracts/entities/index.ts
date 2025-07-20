import { IdRule } from '../../rules';

export abstract class Entity {
  protected constructor(protected readonly _id: IdRule) {}

  public get id(): string {
    return this._id.value;
  }
}
