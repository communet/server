import { LoadChannelByIdPort } from '../../../core/ports';
import { GetChannelByIdService } from '../get-channel-by-id.service';
import { ChannelEntity } from '../../../core/entities';

const createLoadPort = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

describe('GetChannelByIdService tests', () => {
  it('GetChannelByIdService returns channel entity if exists', () => {
    const loadPort = createLoadPort();

    const channelEntity = new ChannelEntity('123', 'Channel name', '123', []);
    loadPort.loadById.mockResolvedValue(channelEntity);

    const getChannelByIdService = new GetChannelByIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(getChannelByIdService.getChannelById('123')).resolves.toStrictEqual(
      channelEntity,
    );
  });

  it('GetChannelByIdService returns null if channel entity does not exists', () => {
    const loadPort = createLoadPort();
    loadPort.loadById.mockResolvedValue(null);

    const getChannelByIdService = new GetChannelByIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(getChannelByIdService.getChannelById('123')).resolves.toBeNull();
  });
});
