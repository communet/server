import { Entity } from '../../../../entities';

export class ChangeMessageCommand<T extends Entity> {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly invoker: T,
  ) {}
}
