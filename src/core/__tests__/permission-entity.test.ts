import { Permission } from '../entities';
import { IdRule } from '../rules';

describe('Entities - Permission', () => {
  it('Permission can be created using constructor and IdRule instance', () => {
    const permission = new Permission(new IdRule('id'));

    expect(permission).toBeInstanceOf(Permission);
  });

  it('Permission can be compared to self and equals self', () => {
    const permission = new Permission(new IdRule('id'));

    expect(permission.equalsTo(permission)).toBe(true);
  });

  it('Permission can be compared to another Permission instance with same id and equals it', () => {
    const permission = new Permission(new IdRule('id'));
    const anotherSamePermission = new Permission(new IdRule('id'));

    expect(permission.equalsTo(anotherSamePermission)).toBe(true);
  });

  it('Permission can be compared to another Permission instance with different id and not equals it', () => {
    const permission = new Permission(new IdRule('id'));
    const anotherDifferentPermission = new Permission(new IdRule('another_id'));

    expect(permission.equalsTo(anotherDifferentPermission)).toBe(false);
  });
});
