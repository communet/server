import { MessageEntity } from '../../../core/entities';
import {
  IdGeneratorPort,
  SaveMessagePort,
  SendMessageCommand,
} from '../../../core/ports';
import { SendMessageService } from '../send-message.service';

class MetaMockedSaveMessagePort implements SaveMessagePort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(message: MessageEntity): Promise<MessageEntity> {
    throw new Error('Method not implemented');
  }
}

const messageEntity = new MessageEntity({
  id: '123',
  content: 'Message content',
  senderId: '123',
  chatId: '123',
  createdAt: new Date(),
});

const saveMock = jest
  .spyOn(MetaMockedSaveMessagePort.prototype, 'save')
  .mockImplementationOnce(() => Promise.resolve(messageEntity));

class MetaMockedIdGeneratorPort implements IdGeneratorPort {
  generate(): string {
    throw new Error('Method not implemented');
  }
}

const idGeneratorMock = jest
  .spyOn(MetaMockedIdGeneratorPort.prototype, 'generate')
  .mockImplementationOnce(() => '123');

describe('SendMessageService tests', () => {
  it('SendMessageService can be created by passing mock SeveMessagePort and IdGeneratorPort and return message entity', () => {
    const savePort = new MetaMockedSaveMessagePort();
    const idGeneratorPort = new MetaMockedIdGeneratorPort();

    const sendService = new SendMessageService(savePort, idGeneratorPort);
    const command = new SendMessageCommand('Message content', '123', '123');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(sendService.send(command)).resolves.toStrictEqual(messageEntity);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(idGeneratorMock).toHaveBeenCalledTimes(1);
  });
});
