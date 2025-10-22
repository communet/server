import { Entity } from '../../../../entities';

export class DeleteChannelCommand<T extends Entity> {
  constructor(
    public readonly id: string,
    public readonly invoker: T,
  ) {}
}
