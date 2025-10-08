import { LoadChannelsByUserIdPort } from '../../../core/ports';
import { GetChannelsByUserIdService } from '../get-channels-by-user-id.service';
import { ChannelEntity } from '../../../core/entities';

class MetaMockedLoadChannelsByUserIdPort implements LoadChannelsByUserIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadByUserId(userId: string): Promise<ChannelEntity[]> {
    throw new Error('Method not implemented');
  }
}

const channelEntities = [new ChannelEntity('123', 'Channel name', '123', [])];

const loadMock = jest
  .spyOn(MetaMockedLoadChannelsByUserIdPort.prototype, 'loadByUserId')
  .mockImplementationOnce(() => Promise.resolve(channelEntities));

describe('GetChannelsByUserIdService tests', () => {
  it('GetChannelsByUserIdService can be created by mock LoadChannelsByUserIdPort and return list of channel entities', () => {
    const loadPort = new MetaMockedLoadChannelsByUserIdPort();
    const service = new GetChannelsByUserIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(service.getChannelsByUserId('123')).resolves.toStrictEqual(
      channelEntities,
    );

    expect(loadMock).toHaveBeenCalledTimes(1);
  });
});
