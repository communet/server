import { v4 } from 'uuid';
import { UserEntity } from '../../../../../core/entities';
import { FixedIdGenerator } from '../../../../common';
import { db } from '../../db.instance';
import { UserRepository } from '../user.repository';

const idGenerator = new FixedIdGenerator(v4());

describe('UserRepository', () => {
  beforeAll(async () => {
    await db.migrate.up();
  });

  afterAll(async () => {
    await db('users').where({ id: idGenerator.generate() }).del();
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
      .insert({ id: idGenerator.generate(), username: 'username' })
      .returning('*');
    const user = users.at(0)!;

    const repository = new UserRepository(db);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(repository.loadById(user.id)).resolves.toStrictEqual(
      new UserEntity(user.id, user.username),
    );
  });
});
