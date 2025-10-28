import { Entity } from '../../../../../core/entities';

export class ChangeChatNameCommand<T extends Entity> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly channelId: string,
    public readonly invoker: T,
  ) {}
}
