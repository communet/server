import { MessageEntity } from '../message';

describe('Entities - MessageEntity', () => {
  it('MessageEntity can be created by constructor', () => {
    const createdAt = new Date();
    const entity = new MessageEntity({
      id: '123456789',
      content: 'some message content',
      senderId: '1234567890',
      chatId: '1234567890',
      createdAt,
    });

    expect(entity.id).toBe('123456789');
    expect(entity.content).toBe('some message content');
    expect(entity.senderId).toBe('1234567890');
    expect(entity.createdAt).toBe(createdAt);
  });

  it('MessageEntity can create without provided created at', () => {
    const entity = new MessageEntity({
      id: '123',
      content: 'some content',
      senderId: '1234567890',
      chatId: '1234567890',
    });

    expect(entity.createdAt).toBeDefined();
  });

  it('MessageEntity throws RuleError if provide empty content', () => {
    const entityConstructor = (): MessageEntity =>
      new MessageEntity({
        id: '12345',
        content: '',
        senderId: '1234567890',
        chatId: '1234567890',
      });

    expect(entityConstructor).toThrow(/length should be >= 1/);
  });
});
