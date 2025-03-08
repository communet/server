import { v4 as uuid4, UUIDTypes as UUID } from 'uuid';

export abstract class BaseEntity {
  protected _oid: UUID;

  constructor() {
    this._oid = uuid4();
  }

  public get oid(): UUID {
    return this._oid;
  }
}
