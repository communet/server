import { AuthTokens } from '@/domain/entities/auth.entities';
import { v4 as uuid4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

export class JWTService {
  constructor(
    protected readonly jwtSecretKey: string,
    protected readonly jwtAlgorithm: string,
    protected readonly jwtExpiresInMinutes: number,
    protected readonly refreshExpiresInDays: number,
  ) {}

  generateAuthTokens(credentialsId: string): AuthTokens {
    const { accessToken, accessExpires } =
      this.generateAccessToken(credentialsId);
    const { refreshToken, refreshExpires } = this.generateRefreshToken();

    return new AuthTokens(
      accessToken,
      accessExpires,
      refreshToken,
      refreshExpires,
    );
  }

  protected generateAccessToken(credentialsId: string): {
    accessToken: string;
    accessExpires: Date;
  } {
    const expires = new Date(
      new Date().getTime() + this.jwtExpiresInMinutes * 60000,
    );
    try {
      const token = jwt.sign(
        {
          credentialsId,
          exp: Math.floor(expires.getTime() / 1000),
        },
        this.jwtSecretKey,
        {
          algorithm: this.jwtAlgorithm as jwt.Algorithm,
        },
      );

      return {
        accessToken: token,
        accessExpires: expires,
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('JWT token signing error: invalid data format');
      }
      if (error instanceof jwt.NotBeforeError) {
        throw new Error('JWT token signing error: token not yet active');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('JWT token signing error: token has expired');
      }
      throw new Error('Unknown error while creating JWT token');
    }
  }

  protected generateRefreshToken(): {
    refreshToken: string;
    refreshExpires: number;
  } {
    const token = String(uuid4());
    const expires = this.refreshExpiresInDays * 24 * 60 * 60; // days to seconds

    return {
      refreshToken: token,
      refreshExpires: expires,
    };
  }
}
