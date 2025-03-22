import { v4 as uuid4, UUIDTypes as UUID } from 'uuid';

export abstract class BaseEntity {
  constructor(
    protected _oid: UUID = uuid4(),
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
  ) {}

  public get oid(): UUID {
    return this._oid;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
