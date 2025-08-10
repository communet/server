import { v4 } from 'uuid';
import { UserEntity } from '../../../../../core/entities';
import { db } from '../../db.instance';
import { UserRepository } from '../user.repository';

describe('Apply all migrations', () => {
  beforeAll(async () => {
    await db.migrate.up();
  });

  afterAll(async () => {
    await db('users').truncate();
    await db.destroy();
  });

  it('UserRepository can be created', () => {
    const respository = new UserRepository(db);

    expect(respository).toBeDefined();
    expect(db).toBeDefined();
  });

  it('UserRepository.loadById returns null if user not found', () => {
    const repository = new UserRepository(db);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(repository.loadById(v4())).resolves.toBeNull();
  });

  it('UserRepository.loadById returns user if found', async () => {
    const users = await db('users')
      .insert({ id: v4(), username: 'username' })
      .returning('*');
    const user = users.at(0)!;

    const repository = new UserRepository(db);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(repository.loadById(user.id)).resolves.toStrictEqual(
      new UserEntity(user.id, user.username),
    );
  });
});
