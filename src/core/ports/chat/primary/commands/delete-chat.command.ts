import { Entity } from '../../../../../core/entities';

export class DeleteChatCommand<T extends Entity> {
  constructor(
    public readonly id: string,
    public readonly channelId: string,
    public readonly invoker: T,
  ) {}
}
