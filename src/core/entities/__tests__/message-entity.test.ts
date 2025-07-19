import { MESSAGE_BODY_OPTIONS, MessageEntity } from '../message';
import { IdRule, StringRule } from '../../rules';

describe('Entities - MessageEntity', () => {
  it('MessageEntity can be created by constructor', () => {
    const messageId = new IdRule('123456789');
    const messageBody = new StringRule(
      'some message body',
      MESSAGE_BODY_OPTIONS,
    );
    const createdAt = new Date();
    const entity = new MessageEntity(messageId, messageBody, createdAt);

    expect(entity.id).toBe(messageId.value);
    expect(entity.body).toBe(messageBody.value);
    expect(entity.createdAt).toBe(createdAt);
  });

  it('MessageEntity can create without provided created at', () => {
    const entity = new MessageEntity(
      new IdRule('123'),
      new StringRule('some body', MESSAGE_BODY_OPTIONS),
    );
    expect(entity.createdAt).toBeDefined();
  });

  it('MessageEntity throws RuleError if provide empty body', () => {
    const entityConstructor = (): MessageEntity =>
      new MessageEntity(
        new IdRule('12345'),
        new StringRule('', MESSAGE_BODY_OPTIONS),
      );

    expect(entityConstructor).toThrow(/length should be > 1/);
  });
});
