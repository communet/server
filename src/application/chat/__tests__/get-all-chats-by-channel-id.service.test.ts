import { LoadChatsByChannelIdPort } from '../../../core/ports';
import { GetAllChatsByChannelIdService } from '../get-all-chats-by-channel-id.service';
import { ChatEntity } from '../../../core/entities';

const createLoadPort = (): jest.Mocked<LoadChatsByChannelIdPort> => {
  return {
    loadByChannelId: jest.fn(),
  };
};

describe('GetAllChatsByChannelIdService tests', () => {
  it('GetAllChatsByChannelIdService can be created by mock LoadChatsByChannelIdPort and return list of chat entities', () => {
    const loadPort = createLoadPort();

    const chatEntityLst = [new ChatEntity('123', 'Chat name', '123', [])];
    loadPort.loadByChannelId.mockResolvedValue(chatEntityLst);

    const getByChannelIdService = new GetAllChatsByChannelIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      getByChannelIdService.getAllByChannelId('123'),
    ).resolves.toStrictEqual(chatEntityLst);
  });
});
