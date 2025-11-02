import { LoadChannelsByUserIdPort } from '../../../core/ports';
import { GetChannelsByUserIdService } from '../get-channels-by-user-id.service';
import { ChannelEntity } from '../../../core/entities';

const createLoadPort = (): jest.Mocked<LoadChannelsByUserIdPort> => {
  return {
    loadByUserId: jest.fn(),
  };
};

describe('GetChannelsByUserIdService tests', () => {
  it('GetChannelsByUserIdService can be created by mock LoadChannelsByUserIdPort and return list of channel entities', () => {
    const loadPort = createLoadPort();

    const channelEntityLst = [
      new ChannelEntity('123', 'Channel name', '123', []),
    ];
    loadPort.loadByUserId.mockResolvedValue(channelEntityLst);

    const service = new GetChannelsByUserIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(service.getChannelsByUserId('123')).resolves.toStrictEqual(
      channelEntityLst,
    );
  });
});
