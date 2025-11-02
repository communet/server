import { MessageEntity } from '../../../core/entities';
import { LoadByChatIdPort } from '../../../core/ports';
import { GetMessagesByChatIdService } from '../get-messages-by-chat-id.service';

const createLoadPort = (): jest.Mocked<LoadByChatIdPort> => {
  return {
    loadByChatId: jest.fn(),
  };
};

describe('GetMessageByChatIdService tests', () => {
  it('GetMessageByChatIdService can be created by mock LoadMessageByIdPort and return list of message entities', () => {
    const loadPort = createLoadPort();

    const messageEntityLst = [
      new MessageEntity({
        id: '123',
        content: 'Message content',
        senderId: '123',
        chatId: '123',
        createdAt: new Date(),
      }),
    ];
    loadPort.loadByChatId.mockResolvedValue(messageEntityLst);

    const getByChatIdService = new GetMessagesByChatIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(getByChatIdService.getMessagesByChat('123')).resolves.toStrictEqual(
      messageEntityLst,
    );
  });
});
