import { Entity } from '../../../../entities';

export class ChangeChannelNameCommand<T extends Entity> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly invoker: T,
  ) {}
}
