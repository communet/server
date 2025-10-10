import { DateRule } from '../date';

describe('Rules - DateRule', () => {
  it('DateRule can be created using constructor without options', () => {
    const now = new Date();
    const dateRule = new DateRule(now);

    expect(dateRule.value).toBe(now);
  });

  it('DateRule can be created using constructor with options', () => {
    const now = new Date();
    const dateRule = new DateRule(now, undefined, { max: new Date() });

    expect(dateRule.value).toBe(now);
  });

  test('DateRule throws RuleError if constructor get date in future with options', () => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const dateRuleConstructor = (): DateRule =>
      new DateRule(futureDate, undefined, { max: now });

    expect(dateRuleConstructor).toThrow(/cannot be in the future/);
  });
});
