import { CHANNEL_NAME_OPTIONS, ChannelEntity } from '../channel';
import { ChatEntity } from '../chat';
import { IdRule, StringRule } from '../../rules';

describe('Entities - ChannelEntity', () => {
  it('ChannelEntity can be created by constructor with only required params', () => {
    const channelId = new IdRule('123456789');
    const channelName = new StringRule(
      'Some channel name',
      CHANNEL_NAME_OPTIONS,
    );
    const channelEntity = new ChannelEntity(channelId, channelName);

    expect(channelEntity.name).toBe(channelName.value);
    expect(channelEntity.id).toBe(channelId.value);
    expect(channelEntity.chats).toStrictEqual([]);
  });

  it('ChannelEntity can be created by constructor with list of chats', () => {
    const chats: ChatEntity[] = [];

    for (let i = 0; i < 3; i++) {
      chats.push(
        new ChatEntity(
          new IdRule(String(i)),
          new StringRule('some channel name', CHANNEL_NAME_OPTIONS),
        ),
      );
    }

    const channelEntity = new ChannelEntity(
      new IdRule('1234'),
      new StringRule('some channel name', CHANNEL_NAME_OPTIONS),
      chats,
    );
    expect(channelEntity.chats).toStrictEqual(chats);
  });

  it('ChannelEntity throws RuleError if provide empty id', () => {
    const channelEntityConstructor = (): ChannelEntity =>
      new ChannelEntity(
        new IdRule(''),
        new StringRule('1231', CHANNEL_NAME_OPTIONS),
      );

    expect(channelEntityConstructor).toThrow(/id cannot be empty/);
  });

  it('ChannelEntity throws RuleError if length(channelName) < 1', () => {
    const channelEntityConstructor = (): ChannelEntity =>
      new ChannelEntity(
        new IdRule('1234567890'),
        new StringRule('', CHANNEL_NAME_OPTIONS),
      );

    expect(channelEntityConstructor).toThrow(/length should be > 1/);
  });

  it('ChannelEntity throws RuleError if length(channelName) > 255', () => {
    const channelEntityConstructor = (): ChannelEntity =>
      new ChannelEntity(
        new IdRule('1234567890'),
        new StringRule('x'.repeat(256), CHANNEL_NAME_OPTIONS),
      );

    expect(channelEntityConstructor).toThrow(/length should be < 255/);
  });
});
