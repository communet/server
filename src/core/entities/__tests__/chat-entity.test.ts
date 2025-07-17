import { ChatEntity } from '../chat';

describe('Entities - ChatEntity', () => {
  it('ChatEntity can be created by consructor', () => {
    const chatId = '123456789';
    const chatName = 'Some chat name';
    const chatEntity = new ChatEntity(chatId, chatName);

    expect(chatEntity.id).toBe(chatId);
    expect(chatEntity.name).toBe(chatName);
  });

  it('ChatEntity throws RuleError if provide empty id', () => {
    const chatEntityConstrucotr = (): ChatEntity =>
      new ChatEntity('', 'SomeChatName');

    expect(chatEntityConstrucotr).toThrow(/id cannot be empty/);
  });

  it('ChatEntity throws RuleError if length(chatName) < 1', () => {
    const chatEntityConstrucotr = (): ChatEntity =>
      new ChatEntity('1234567890', '');

    expect(chatEntityConstrucotr).toThrow(/length should be > 1/);
  });

  it('ChatEntity throws RuleError if length(chatName) > 50', () => {
    const chatEntityConstrucotr = (): ChatEntity =>
      new ChatEntity('1234567890', 'x'.repeat(51));

    expect(chatEntityConstrucotr).toThrow(/length should be < 50/);
  });
});
