import { BaseEntity } from '@/domain/entities/base.entities';

export abstract class BaseQuery {}

export abstract class IQueryHandler<
  TQuery extends BaseQuery,
  TResult extends BaseEntity,
> {
  abstract execute(command: TQuery): Promise<TResult>;
}
