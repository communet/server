import { UserEntity } from '../../../../core/entities';
import { Response } from '../types';
import { UserResponse } from './types';

export const mapUserEntity = (user: UserEntity): Response<UserResponse> => ({
  error: false,
  data: {
    id: user.id,
    username: user.username,
  },
});
