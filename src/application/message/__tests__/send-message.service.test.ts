import { MessageEntity } from '../../../core/entities';
import {
  IdGeneratorPort,
  SaveMessagePort,
  SendMessageCommand,
} from '../../../core/ports';
import { SendMessageService } from '../send-message.service';

const createSavePort = (): jest.Mocked<SaveMessagePort> => {
  return {
    save: jest.fn(),
  };
};

const createIdGeneratorPort = (): jest.Mocked<IdGeneratorPort> => {
  return {
    generate: jest.fn(),
  };
};

describe('SendMessageService tests', () => {
  it('SendMessageService can be created by passing mock SeveMessagePort and IdGeneratorPort and return message entity', () => {
    const savePort = createSavePort();
    const idGeneratorPort = createIdGeneratorPort();

    const messageEntity = new MessageEntity({
      id: '123',
      content: 'Message content',
      senderId: '123',
      chatId: '123',
      createdAt: new Date(),
    });

    savePort.save.mockResolvedValue(messageEntity);
    idGeneratorPort.generate.mockReturnValue('123');

    const sendService = new SendMessageService(savePort, idGeneratorPort);
    const command = new SendMessageCommand('Message content', '123', '123');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(sendService.send(command)).resolves.toStrictEqual(messageEntity);
  });
});
