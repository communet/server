import { BaseEntity } from '@/domain/entities/base.entities';

export class AuthTokens extends BaseEntity {
  constructor(
    protected _accessToken: string,
    protected _accessExpires: Date,
    protected _refreshToken: string,
    protected _refreshExpires: number,
  ) {
    super();
  }

  public get accessToken(): string {
    return this._accessToken;
  }

  public get accessExpires(): Date {
    return this._accessExpires;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public get refreshExpires(): number {
    return this._refreshExpires;
  }
}
