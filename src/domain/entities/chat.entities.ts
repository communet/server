import { v4 as uuid4, UUIDTypes as UUID } from 'uuid';
import { BaseEntity } from '@/domain/entities/base.entities';
import { Channel } from '@/domain/entities/channels.entities';
import { ChatName, ChatTypeVT } from '@/domain/values/chat.values';

export class Chat extends BaseEntity {
  constructor(
    protected _name: ChatName,
    protected _type: ChatTypeVT,
    protected _channel: Channel,
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
    protected _oid: UUID = uuid4(),
  ) {
    super(_createdAt, _updatedAt, _oid);
  }

  public get name(): string {
    return this._name.getValue();
  }

  public get type(): string {
    return this._type.getValue();
  }

  public get channel(): Channel {
    return this._channel;
  }
}
