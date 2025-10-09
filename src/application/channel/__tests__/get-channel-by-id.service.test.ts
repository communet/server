import { LoadChannelByIdPort } from '../../../core/ports';
import { GetChannelByIdService } from '../get-channel-by-id.service';
import { ChannelEntity } from '../../../core/entities';

class MetaMockedLoadChannelByIdPort implements LoadChannelByIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadById(id: string): Promise<ChannelEntity | null> {
    throw new Error('Method not implemented');
  }
}

const channelEntity = new ChannelEntity('123', 'Channel name', '123', []);

const loadMock = jest
  .spyOn(MetaMockedLoadChannelByIdPort.prototype, 'loadById')
  .mockImplementationOnce(() => Promise.resolve(channelEntity))
  .mockImplementationOnce(() => Promise.resolve(null));

describe('GetChannelByIdService tests', () => {
  it('GetChannelByIdService can be created by mock LoadChannelByIdPort and return channel entity or null', () => {
    const loadChannelPort = new MetaMockedLoadChannelByIdPort();
    const getChannelByIdService = new GetChannelByIdService(loadChannelPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(getChannelByIdService.getChannelById('123')).resolves.toStrictEqual(
      channelEntity,
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(getChannelByIdService.getChannelById('123')).resolves.toBeNull();

    expect(loadMock).toHaveBeenCalledTimes(2);
  });
});
