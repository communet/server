import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

export abstract class ITransactionManager {
  abstract transaction<T>(
    operation: (manager: unknown) => Promise<T>,
  ): Promise<T>;
}

export class TypeOrmTransactionManager extends ITransactionManager {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super();
  }

  async transaction<T>(
    operation: (manager: unknown) => Promise<T>,
  ): Promise<T> {
    return this.entityManager.transaction(operation);
  }
}
