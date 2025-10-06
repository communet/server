import { ChatEntity } from '../chat';
import { MessageEntity } from '../message';

describe('Entities - ChatEntity', () => {
  it('ChatEntity can be created by constructor', () => {
    const chatEntity = new ChatEntity(
      '123456789',
      'Some chat name',
      '1234567890',
    );

    expect(chatEntity.id).toBe('123456789');
    expect(chatEntity.name).toBe('Some chat name');
    expect(chatEntity.messages.length).toBe(0);
  });

  it('ChatEntity can be created with provided message entities', () => {
    const messages: MessageEntity[] = [];
    for (let i = 0; i < 10; i++) {
      messages.push(
        new MessageEntity({
          id: String(i),
          content: 'Some message content',
          senderId: '1234567890',
          chatId: '1234567890',
        }),
      );
    }

    const chatEntity = new ChatEntity(
      '12345',
      'Some chat name',
      '1234567890',
      messages,
    );

    expect(chatEntity.messages.length).toBe(10);
    expect(chatEntity.messages).toStrictEqual(messages);
  });

  it('ChatEntity throws RuleError if provide empty id', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity('', 'SomeChatName', '1234567890');

    expect(chatEntityConstructor).toThrow(/id cannot be empty/);
  });

  it('ChatEntity throws RuleError if length(chatName) < 1', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity('1234567890', '', '1234567890');

    expect(chatEntityConstructor).toThrow(/length should be >= 1/);
  });

  it('ChatEntity throws RuleError if length(chatName) > 50', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity('1234567890', 'x'.repeat(51), '1234567890');

    expect(chatEntityConstructor).toThrow(/length should be <= 50/);
  });
});
