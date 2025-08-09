import { UserEntity } from '../../../entities';

export abstract class LoadUserByIdPort {
  abstract loadById(id: string): Promise<UserEntity | null>;
}
