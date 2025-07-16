import { StringRule } from '../string/string.rule';

describe('Rules - StringRule', () => {
  it('StringRule can be created using constructor and string', () => {
    const stringRule = new StringRule('string');

    expect(stringRule.value).toBe('string');
  });

  it('StringRule throws RuleError if string is lower than max length', () => {
    const stringRuleConstructor = (): StringRule =>
      new StringRule('string', { max: 5 });

    expect(stringRuleConstructor).toThrow(/length should be < 5/);
  });

  it('StringRule throws RuleError if string is higher than min length', () => {
    const stringRuleConstructor = (): StringRule =>
      new StringRule('sng', { min: 5 });

    expect(stringRuleConstructor).toThrow(/length should be > 5/);
  });

  it('StringRule throws RuleError if string does not match regex', () => {
    const stringRuleConstructor = (): StringRule =>
      new StringRule('string', { regex: /test/ });

    expect(stringRuleConstructor).toThrow(/invalid string format/);
  });

  it('StringRule throws RuleError with message length should be < N with maxLength and regex options', () => {
    const stringRuleConstructor = (): StringRule =>
      new StringRule('strinasdfg', { max: 5, regex: /test/ });

    expect(stringRuleConstructor).toThrow(/length should be < 5/);
  });

  it('StringRule throws RuleError with message length should be > N with minLength and regex options', () => {
    const stringRuleConstructor = (): StringRule =>
      new StringRule('stri', { min: 5, regex: /test/ });

    expect(stringRuleConstructor).toThrow(/length should be > 5/);
  });
});
