import { v4 } from 'uuid';
import { UserEntity } from '../../../../../core/entities';
import { IdGeneratorAdapter } from '../../../../common';
import { db } from '../../db.instance';
import { UserRepository } from '../user.repository';

const idGenerator = new IdGeneratorAdapter();

describe('UserRepository', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('UserRepository.loadById returns null if user not found', async () => {
    const transaction = await db.transaction();
    const repository = new UserRepository(transaction);

    const result = await repository.loadById(v4());

    expect(result).toBeNull();

    await transaction.rollback();
  });

  it('UserRepository.loadById returns user if found', async () => {
    const transaction = await db.transaction();

    const users = await transaction('users')
      .insert({ id: idGenerator.generate(), username: 'username' })
      .returning('*');
    const user = users.at(0)!;

    const repository = new UserRepository(transaction);
    const result = await repository.loadById(user.id);

    await transaction.rollback();

    expect(result).toStrictEqual(new UserEntity(user.id, user.username));
  });
});
