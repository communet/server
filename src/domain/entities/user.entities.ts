import { BaseEntity } from '@/domain/entities/base.entities';
import {
  DisplayName,
  Email,
  Password,
  Username,
} from '@/domain/values/user.values';

export class Credentials extends BaseEntity {
  constructor(
    protected _username: Username,
    protected _email: Email,
    protected _password: Password,
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
  ) {
    super();
  }

  public get username(): string {
    return this._username.getValue();
  }

  public get email(): string {
    return this._email.getValue();
  }

  public get password(): string {
    return this._password.getValue();
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}

export class Profile extends BaseEntity {
  constructor(
    protected _displayName: DisplayName,
    protected _credentials: Credentials,
    protected _avatarUrl: string | undefined = undefined,
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
  ) {
    super();
  }

  public get displayName(): string {
    return this._displayName.getValue();
  }

  public get credentials(): Credentials {
    return this._credentials;
  }

  public get avatarUrl(): string | undefined {
    return this._avatarUrl;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
