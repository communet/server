import {
  ChangeMessageCommand,
  LoadMessageByIdPort,
  SaveMessagePort,
} from '../../../core/ports';
import { ChangeMessageService } from '../change-message.service';
import { MessageEntity, UserEntity } from '../../../core/entities';
import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';

const createLoadMessageByIdPort = (): jest.Mocked<LoadMessageByIdPort> => {
  return {
    load: jest.fn(),
  };
};

const createSaveMessagePort = (): jest.Mocked<SaveMessagePort> => {
  return {
    save: jest.fn(),
  };
};

describe('ChangeMessageService tests', () => {
  it('ChangeMessageService returns updated message if changes succeed', () => {
    const loadPort = createLoadMessageByIdPort();
    const savePort = createSaveMessagePort();

    const messageCreatedAt = new Date();

    const loadMessage = new MessageEntity({
      id: '123',
      content: 'content',
      senderId: '123',
      chatId: '123',
      createdAt: messageCreatedAt,
    });
    loadPort.load.mockResolvedValue(loadMessage);

    const updatedMessage = new MessageEntity({
      id: '123',
      content: 'new content',
      senderId: '123',
      chatId: '123',
      createdAt: messageCreatedAt,
    });
    savePort.save.mockResolvedValue(updatedMessage);

    const changeService = new ChangeMessageService(loadPort, savePort);
    const command = new ChangeMessageCommand(
      '123',
      'new content',
      new UserEntity('123', 'Admin'),
    );
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.change(command)).resolves.toStrictEqual(
      updatedMessage,
    );
  });

  it('ChangeMessageService throws PolicyViolationError if command invoker has no rights', () => {
    const loadPort = createLoadMessageByIdPort();
    const savePort = createSaveMessagePort();

    const message = new MessageEntity({
      id: '123',
      content: 'content',
      senderId: '123',
      chatId: '123',
      createdAt: new Date(),
    });

    loadPort.load.mockResolvedValue(message);

    const changeService = new ChangeMessageService(loadPort, savePort);
    const command = new ChangeMessageCommand(
      '123',
      'new content',
      new UserEntity('321', 'Admin'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.change(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('ChangeMessageService throws EntityNotFoundError if entity not found', () => {
    const loadPort = createLoadMessageByIdPort();
    const savePort = createSaveMessagePort();

    loadPort.load.mockResolvedValue(null);

    const changeService = new ChangeMessageService(loadPort, savePort);
    const command = new ChangeMessageCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.change(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
