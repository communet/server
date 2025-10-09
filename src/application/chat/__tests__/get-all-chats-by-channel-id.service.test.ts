import { LoadChatsByChannelIdPort } from '../../../core/ports';
import { GetAllChatsByChannelIdService } from '../get-all-chats-by-channel-id.service';
import { ChatEntity } from '../../../core/entities';

class MetaMockedLoadChatsByChannelIdPort implements LoadChatsByChannelIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadByChannelId(channelId: string): Promise<ChatEntity[]> {
    throw Error('Method not implemented');
  }
}

const chatEntities = [new ChatEntity('123', 'Chat name', '123', [])];

const loadMock = jest
  .spyOn(MetaMockedLoadChatsByChannelIdPort.prototype, 'loadByChannelId')
  .mockImplementationOnce(() => Promise.resolve(chatEntities));

describe('GetAllChatsByChannelIdService tests', () => {
  it('GetAllChatsByChannelIdService can be created by mock LoadChatsByChannelIdPort and return list of chat entities', () => {
    const loadChatsByChannelIdPort = new MetaMockedLoadChatsByChannelIdPort();
    const getByChannelIdService = new GetAllChatsByChannelIdService(
      loadChatsByChannelIdPort,
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      getByChannelIdService.getAllByChannelId('123'),
    ).resolves.toStrictEqual(chatEntities);

    expect(loadMock).toHaveBeenCalledTimes(1);
  });
});
