export abstract class BaseCommand {}

export abstract class ICommandHandler<TCommand extends BaseCommand, TResult> {
  abstract execute(command: TCommand): Promise<TResult>;
}
