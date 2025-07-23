import { UserEntity } from '../user';

describe('Entities - UserEntity', () => {
  it('UserEntity can be created by constructor', () => {
    const userEntity = new UserEntity('12345', 'some username');

    expect(userEntity.id).toBe('12345');
    expect(userEntity.username).toBe('some username');
  });

  it('UserEntity throws RuleError if provide empty id', () => {
    const userEntityConstructor = (): UserEntity =>
      new UserEntity('', 'some username');

    expect(userEntityConstructor).toThrow(/id cannot be empty/);
  });

  it('UserEntity throws RuleError if provide empty username', () => {
    const userEntityConstructor = (): UserEntity => new UserEntity('12345', '');

    expect(userEntityConstructor).toThrow(/length should be >= 3/);
  });

  it('UserEntity throws RuleError if provide too short username', () => {
    const userEntityConstructor = (): UserEntity =>
      new UserEntity('12345', 's');

    expect(userEntityConstructor).toThrow(/length should be >= 3/);
  });

  it('UserEntity throws RuleError if provide too long username', () => {
    const userEntityConstructor = (): UserEntity =>
      new UserEntity('12345', 's'.repeat(33));

    expect(userEntityConstructor).toThrow(/length should be <= 32/);
  });
});
