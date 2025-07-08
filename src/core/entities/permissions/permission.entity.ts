import { IdRule } from 'src/core/rules';

export class Permission {
  constructor(private readonly id: IdRule) {}

  equalsTo(permission: Permission): boolean {
    return permission.id.value === this.id.value;
  }
}
