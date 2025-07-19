import { CHAT_NAME_OPTIONS, ChatEntity } from '../chat';
import { MESSAGE_BODY_OPTIONS, MessageEntity } from '../message';
import { IdRule, StringRule } from '../../rules';

describe('Entities - ChatEntity', () => {
  it('ChatEntity can be created by constructor', () => {
    const chatId = new IdRule('123456789');
    const chatName = new StringRule('Some chat name', CHAT_NAME_OPTIONS);
    const chatEntity = new ChatEntity(chatId, chatName);

    expect(chatEntity.id).toBe(chatId.value);
    expect(chatEntity.name).toBe(chatName.value);
    expect(chatEntity.messages.length).toBe(0);
  });

  it('ChatEntity can be created with provided message entities', () => {
    const messages: MessageEntity[] = [];
    for (let i = 0; i < 10; i++) {
      messages.push(
        new MessageEntity(
          new IdRule(String(i)),
          new StringRule('Some message body', MESSAGE_BODY_OPTIONS),
        ),
      );
    }

    const chatEntity = new ChatEntity(
      new IdRule('12345'),
      new StringRule('Some chat name', CHAT_NAME_OPTIONS),
      messages,
    );

    expect(chatEntity.messages.length).toBe(10);
  });

  it('ChatEntity throws RuleError if provide empty id', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity(
        new IdRule(''),
        new StringRule('SomeChatName', CHAT_NAME_OPTIONS),
      );

    expect(chatEntityConstructor).toThrow(/id cannot be empty/);
  });

  it('ChatEntity throws RuleError if length(chatName) < 1', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity(
        new IdRule('1234567890'),
        new StringRule('', CHAT_NAME_OPTIONS),
      );

    expect(chatEntityConstructor).toThrow(/length should be > 1/);
  });

  it('ChatEntity throws RuleError if length(chatName) > 50', () => {
    const chatEntityConstructor = (): ChatEntity =>
      new ChatEntity(
        new IdRule('1234567890'),
        new StringRule('x'.repeat(51), CHAT_NAME_OPTIONS),
      );

    expect(chatEntityConstructor).toThrow(/length should be < 50/);
  });
});
