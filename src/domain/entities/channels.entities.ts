import { v4 as uuid4, UUIDTypes as UUID } from 'uuid';
import { BaseEntity } from '@/domain/entities/base.entities';
import { ChannelName } from '@/domain/values/channels.values';

export class Channel extends BaseEntity {
  constructor(
    protected _name: ChannelName,
    protected _description: string | undefined = undefined,
    protected _avatarUrl: string | undefined = undefined,
    protected _isDeleted: boolean = false,
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
    protected _oid: UUID = uuid4(),
  ) {
    super(_createdAt, _updatedAt, _oid);
  }

  public get name(): string {
    return this._name.getValue();
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get isDeleted(): boolean {
    return this._isDeleted;
  }

  public get avatarUrl(): string | undefined {
    return this._avatarUrl;
  }

  public set avatarUrl(value: string | undefined) {
    this._avatarUrl = value;
  }
}
