import {
  ChangeMessageCommand,
  LoadMessageByIdPort,
  SaveMessagePort,
} from '../../../core/ports';
import { ChangeMessageService } from '../change-message.service';
import { MessageEntity } from '../../../core/entities';
import { EntityNotFoundError } from '../../../application/errors';

class MetaMockedLoadMessageByIdPort implements LoadMessageByIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(id: string): Promise<MessageEntity | null> {
    throw new Error('Method not implemented');
  }
}

const createdAt = new Date();

const loadMock = jest
  .spyOn(MetaMockedLoadMessageByIdPort.prototype, 'load')
  .mockImplementationOnce(() =>
    Promise.resolve(
      new MessageEntity({
        id: '123',
        content: 'Message content',
        senderId: '123',
        chatId: '123',
        createdAt: createdAt,
      }),
    ),
  )
  .mockImplementationOnce(() => Promise.resolve(null));

class MetaMockedSaveMessagePort implements SaveMessagePort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(message: MessageEntity): Promise<MessageEntity> {
    throw new Error('Method not implemented');
  }
}

const updatedMessageEntity = new MessageEntity({
  id: '123',
  content: 'New message content',
  senderId: '123',
  chatId: '123',
  createdAt: createdAt,
});

const saveMock = jest
  .spyOn(MetaMockedSaveMessagePort.prototype, 'save')
  .mockImplementationOnce(() => Promise.resolve(updatedMessageEntity));

describe('ChangeMessageService tests', () => {
  it('ChangeMessageService can be created by passing mock LoadMessageByIdPort and SaveMessage port and return modified message', async () => {
    const loadMessageByIdPort = new MetaMockedLoadMessageByIdPort();
    const saveMessagePort = new MetaMockedSaveMessagePort();

    const changeService = new ChangeMessageService(
      loadMessageByIdPort,
      saveMessagePort,
    );

    const command = new ChangeMessageCommand('123', 'New message content');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.change(command)).resolves.toStrictEqual(
      updatedMessageEntity,
    );

    try {
      await changeService.change(command);
    } catch (error) {
      expect(error).toBeInstanceOf(EntityNotFoundError);
    }

    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(saveMock).toHaveBeenCalledTimes(1);
  });
});
