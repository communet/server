import { Knex } from 'knex';
import { UserEntity } from '../../../../core/entities';
import { LoadUserByIdPort } from '../../../../core/ports';

export class UserRepository implements LoadUserByIdPort {
  constructor(private readonly knex: Knex) {}

  async loadById(id: string): Promise<UserEntity | null> {
    const user = await this.knex('users').where({ id }).first();

    return user ? new UserEntity(id, user.username) : null;
  }
}
