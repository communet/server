import { NIL, v4 } from 'uuid';
import { IdGeneratorPort } from '../../../core/ports/common';

export class IdGeneratorAdapter implements IdGeneratorPort {
  generate(): string {
    return v4();
  }
}

export class NilIdGeneratorAdapter implements IdGeneratorPort {
  generate(): string {
    return NIL;
  }
}

export class FixedIdGenerator implements IdGeneratorPort {
  constructor(private readonly id: string) {}

  generate(): string {
    return this.id;
  }
}
