import { DateRule } from '../date';

describe('Rules - DateRule', () => {
  it('DateRule can be created using constructor', () => {
    const now = new Date();
    const dateRule = new DateRule(now);

    expect(dateRule.value).toBe(now);
  });

  test('DateRule throws RuleError if constructor get date in future', () => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const dateRuleConstructor = (): DateRule => new DateRule(futureDate);

    expect(dateRuleConstructor).toThrow(/Date cannot be in the future/);
  });
});
