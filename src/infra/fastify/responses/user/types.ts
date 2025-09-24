import { UserEntity } from '../../../../core/entities';

export type UserResponse = {
  id: UserEntity['id'];
  username: UserEntity['username'];
};
