import { Entity } from '../../../../../core/entities';

export class CreateChatCommand<T extends Entity> {
  constructor(
    public readonly name: string,
    public readonly channelId: string,
    public readonly invoker: T,
  ) {}
}
