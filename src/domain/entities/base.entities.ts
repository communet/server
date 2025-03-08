import { v4 as uuid4, UUIDTypes as UUID } from 'uuid';

export abstract class BaseEntity {
  protected oid: UUID;

  constructor() {
    this.oid = uuid4();
  }

  public getOid(): UUID {
    return this.oid;
  }
}
