import { BaseEntity } from '@/domain/entities/base.entities';
import { Email, Password, Username } from '@/domain/values/user.values';

export class Credentials extends BaseEntity {
  getEmail(): string {
    throw new Error('Method not implemented.');
  }
  protected _username: Username;
  protected _email: Email;
  protected _password: Password;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(
    username: Username,
    email: Email,
    password: Password,
    createdAt: Date | undefined = undefined,
    updatedAt: Date | undefined = undefined,
  ) {
    super();
    this._username = username;
    this._email = email;
    this._password = password;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
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
