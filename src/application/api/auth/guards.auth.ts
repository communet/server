import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from '@/domain/entities/user.entities';
import { Request } from 'express';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import { convertProfileModelToEntity } from '@/infra/database/converters/user.converters';
import { Algorithm } from 'jsonwebtoken';

export interface RequestWithUser extends Request {
  user: Profile;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly profileRepository: IProfileRepository,
    private readonly JWT_SECRET: string,
    private readonly JWT_ALGORITHM: Algorithm,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
      algorithms: [JWT_ALGORITHM],
    });
  }

  async validate(payload: { profileId: string }): Promise<Profile> {
    const profileModel = await this.profileRepository.findById(
      payload.profileId,
    );
    if (!profileModel) {
      throw new Error('User not found');
    }
    const profile = convertProfileModelToEntity(profileModel);
    return profile;
  }
}
