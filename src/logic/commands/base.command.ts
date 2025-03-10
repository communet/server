import { BaseEntity } from '@/domain/entities/base.entities';

export abstract class BaseCommand {}

export abstract class ICommandHandler<
  TCommand extends BaseCommand,
  TResult extends BaseEntity,
> {
  abstract execute(command: TCommand): Promise<TResult>;
}
