import { UserEntity } from '../../../../entities';

export abstract class GetUserByIdQuery {
  abstract getById(id: string): Promise<UserEntity | null>;
}
