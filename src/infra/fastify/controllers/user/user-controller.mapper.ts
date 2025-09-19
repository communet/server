import { UserEntity } from '../../../../core/entities';
import {
  createNotFoundResponse,
  createOkResponse,
  Response,
} from '../response';
import { UserGetByIdResponse } from './types';

export class UserControllerMapper {
  static toResponse(user: UserEntity | null): Response<UserGetByIdResponse> {
    if (!user) {
      return createNotFoundResponse('User not found');
    }

    return createOkResponse({
      id: user.id,
      username: user.username,
    });
  }
}
