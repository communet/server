import { ChannelEntity } from '../channel';
import { ChatEntity } from '../chat';

describe('Entities - ChannelEntity', () => {
  it('ChannelEntity can be created by consructor with only reqired params', () => {
    const channelName = 'Some channel name';
    const channelId = '123456789';
    const channelEntity = new ChannelEntity(channelId, channelName);

    expect(channelEntity.name).toBe(channelName);
    expect(channelEntity.id).toBe(channelId);
    expect(channelEntity.chats).toStrictEqual([]);
  });

  it('ChannelEntity can be created by constructor with list of chats', () => {
    const chats: ChatEntity[] = [];

    for (let i = 0; i < 3; i++) {
      chats.push(new ChatEntity(String(i), 'some channel name'));
    }

    const channelEntity = new ChannelEntity('1234', 'some channel name', chats);
    expect(channelEntity.chats).toStrictEqual(chats);
  });

  it('ChannelEntity throws RuleError if provide empty id', () => {
    const channelName = '1231';
    const channelId = '';

    const channelEntityConstrucotr = (): ChannelEntity =>
      new ChannelEntity(channelId, channelName);

    expect(channelEntityConstrucotr).toThrow(/id cannot be empty/);
  });

  it('ChannelEntity throws RuleError if length(channelName) < 1', () => {
    const channelName = '';
    const channelId = '1234567890';

    const channelEntityConstrucotr = (): ChannelEntity =>
      new ChannelEntity(channelId, channelName);

    expect(channelEntityConstrucotr).toThrow(/length should be > 1/);
  });

  it('ChannelEntity throws RuleError if length(channelName) > 255', () => {
    const channelName = 'x'.repeat(256);
    const channelId = '1234567890';

    const channelEntityConstrucotr = (): ChannelEntity =>
      new ChannelEntity(channelId, channelName);

    expect(channelEntityConstrucotr).toThrow(/length should be < 255/);
  });
});
