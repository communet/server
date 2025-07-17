import { ChannelEntity } from '../channel';

describe('Entities - ChannelEntity', () => {
  it('ChannelEntity can be created by consructor', () => {
    const channelName = 'Some channel name';
    const channelId = '123456789';
    const channelEntity = new ChannelEntity(channelId, channelName);

    expect(channelEntity.name).toBe(channelName);
    expect(channelEntity.id).toBe(channelId);
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
