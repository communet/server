import { ChatEntity } from '../chat';
import { MessageEntity } from '../message';

describe('Entities - ChatEntity', () => {
  it('ChatEntity can be created by constructor', () => {
    const chatId = '123456789';
    const chatName = 'Some chat name';
    const chatEntity = new ChatEntity(chatId, chatName);

    expect(chatEntity.id).toBe(chatId);
    expect(chatEntity.name).toBe(chatName);
    expect(chatEntity.messages.length).toBe(0);
  });

  it('ChatEntity can be created with provided message entities', () => {
    const messages: MessageEntity[] = [];
    for (let i = 0; i < 10; i++) {
      messages.push(new MessageEntity(String(i), 'Some message body'));
    }

    const chatEntity = new ChatEntity('12345', 'Some chat name', messages);

    expect(chatEntity.messages.length).toBe(10);
  });

  it('ChatEntity throws RuleError if provide empty id', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity('', 'SomeChatName');

    expect(chatEntityConstructor).toThrow(/id cannot be empty/);
  });

  it('ChatEntity throws RuleError if length(chatName) < 1', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity('1234567890', '');

    expect(chatEntityConstructor).toThrow(/length should be > 1/);
  });

  it('ChatEntity throws RuleError if length(chatName) > 50', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity('1234567890', 'x'.repeat(51));

    expect(chatEntityConstructor).toThrow(/length should be < 50/);
  });
});
