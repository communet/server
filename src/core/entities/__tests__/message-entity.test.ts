import { MessageEntity } from '../message';

describe('Entities - MessageEntity', () => {
  it('MessageEntity can be created by constructor', () => {
    const messageId = '123456789';
    const messageBody = 'some message body';
    const createdAt = new Date();
    const entity = new MessageEntity(messageId, messageBody, createdAt);

    expect(entity.id).toBe(messageId);
    expect(entity.body).toBe(messageBody);
    expect(entity.createdAt).toBe(createdAt);
  });

  it('MessageEntity can create without provided created at', () => {
    const entity = new MessageEntity('123', 'some body');
    expect(entity.createdAt).toBeDefined();
  });

  it('MessageEntity throws RuleError if provide empty body', () => {
    const entityConstructor = (): MessageEntity =>
      new MessageEntity('12345', '');

    expect(entityConstructor).toThrow(/length should be > 1/);
  });
});
