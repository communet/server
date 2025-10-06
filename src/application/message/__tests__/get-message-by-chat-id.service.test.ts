import { MessageEntity } from '../../../core/entities';
import { LoadByChatIdPort } from '../../../core/ports';
import { GetMessagesByChatIdService } from '../get-messages-by-chat-id.service';

class MetaMockedLoadMessageByIdPort implements LoadByChatIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadByChatId(chatId: string): Promise<MessageEntity[]> {
    throw new Error('Method not implemented');
  }
}

const messageEntities = [
  new MessageEntity({
    id: '123',
    content: 'Message content',
    senderId: '123',
    chatId: '123',
    createdAt: new Date(),
  }),
];

const loadMock = jest
  .spyOn(MetaMockedLoadMessageByIdPort.prototype, 'loadByChatId')
  .mockImplementationOnce(() => Promise.resolve(messageEntities));

describe('GetMessageByChatIdService tests', () => {
  it('GetMessageByChatIdService can be created by mock LoadMessageByIdPort and return list of message entities', () => {
    const loadMessageByChatIdPort = new MetaMockedLoadMessageByIdPort();

    const getByChatIdService = new GetMessagesByChatIdService(
      loadMessageByChatIdPort,
    );
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(getByChatIdService.getMessagesByChat('123')).resolves.toStrictEqual(
      messageEntities,
    );

    expect(loadMock).toHaveBeenCalledTimes(1);
  });
});
