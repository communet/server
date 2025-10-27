import { Entity } from '../../../../entities';

export class DeleteMessageCommand<T extends Entity> {
  constructor(
    public readonly id: string,
    public readonly channelId: string,
    public readonly invoker: T,
  ) {}
}
