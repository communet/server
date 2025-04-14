export abstract class BaseQuery {}

export abstract class IQueryHandler<TQuery extends BaseQuery, TResult> {
  abstract execute(query: TQuery): Promise<TResult>;
}
