import { IdRule } from '../id.rule';

describe('Rules - IdRule', () => {
  it('IdRule can be created using constructor and non-empty string', () => {
    const idRule = new IdRule('id');

    expect(idRule.value).toBe('id');
  });

  test('IdRule throws RuleError if empty string is provided and RuleError contains clear message', () => {
    const idRuleConstructor = (): IdRule => new IdRule('');

    expect(idRuleConstructor).toThrow(/id cannot be empty/);
  });
});
