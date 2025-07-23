import { ChannelEntity } from '../channel';
import { ChatEntity } from '../chat';

describe('Entities - ChannelEntity', () => {
  it('ChannelEntity can be created by constructor with only required params', () => {
    const channelEntity = new ChannelEntity('123456789', 'Some channel name');

    expect(channelEntity.name).toBe('Some channel name');
    expect(channelEntity.id).toBe('123456789');
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
    const channelEntityConstructor = (): ChannelEntity =>
      new ChannelEntity('', '1231');

    expect(channelEntityConstructor).toThrow(/id cannot be empty/);
  });

  it('ChannelEntity throws RuleError if length(channelName) < 1', () => {
    const channelEntityConstructor = (): ChannelEntity =>
      new ChannelEntity('1234567890', '');

    expect(channelEntityConstructor).toThrow(/length should be >= 1/);
  });

  it('ChannelEntity throws RuleError if length(channelName) > 255', () => {
    const channelEntityConstructor = (): ChannelEntity =>
      new ChannelEntity('1234567890', 'x'.repeat(256));

    expect(channelEntityConstructor).toThrow(/length should be <= 255/);
  });
});
