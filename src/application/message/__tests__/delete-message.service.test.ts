import {
  ChannelEntity,
  MessageEntity,
  UserEntity,
} from '../../../core/entities';
import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';
import {
  DeleteMessageCommand,
  LoadChannelByIdPort,
  LoadMessageByIdPort,
  RemoveMessagePort,
} from '../../../core/ports';
import { DeleteMessageService } from '../delete-message.service';

const createLoadChannelByIdPort = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

const createLoadMessageByIdPort = (): jest.Mocked<LoadMessageByIdPort> => {
  return {
    load: jest.fn(),
  };
};

const createRemoveMessagePort = (): jest.Mocked<RemoveMessagePort> => {
  return {
    remove: jest.fn(),
  };
};

describe('DeleteMessageService tests', () => {
  it('DeleteMessageService successfully delete message if invoker if equals message sender id', async () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const loadMessagePort = createLoadMessageByIdPort();
    const removeMessagePort = createRemoveMessagePort();

    loadMessagePort.load.mockResolvedValue(
      new MessageEntity({
        id: '123',
        content: 'Message content',
        senderId: '123',
        chatId: '123',
        createdAt: new Date(),
      }),
    );

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', 'ChannelName', '321', []),
    );

    const deleteService = new DeleteMessageService(
      loadMessagePort,
      removeMessagePort,
      loadChannelPort,
    );

    const command = new DeleteMessageCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    const result = await deleteService.delete(command);
    expect(result).toBeUndefined();
  });

  it('DeleteMessageService successfully delete message if invoker id equals channel creator id', async () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const loadMessagePort = createLoadMessageByIdPort();
    const removeMessagePort = createRemoveMessagePort();

    loadMessagePort.load.mockResolvedValue(
      new MessageEntity({
        id: '123',
        content: 'Message content',
        senderId: '321',
        chatId: '123',
        createdAt: new Date(),
      }),
    );

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', 'ChannelName', '123', []),
    );

    const deleteService = new DeleteMessageService(
      loadMessagePort,
      removeMessagePort,
      loadChannelPort,
    );

    const command = new DeleteMessageCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    const result = await deleteService.delete(command);
    expect(result).toBeUndefined();
  });

  it('DeleteMessageService throws PolicyViolationError if command invoker has no rights', async () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const loadMessagePort = createLoadMessageByIdPort();
    const removeMessagePort = createRemoveMessagePort();

    loadMessagePort.load.mockResolvedValue(
      new MessageEntity({
        id: '123',
        content: 'Message content',
        senderId: '321',
        chatId: '123',
        createdAt: new Date(),
      }),
    );

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', 'ChannelName', '123', []),
    );

    const deleteService = new DeleteMessageService(
      loadMessagePort,
      removeMessagePort,
      loadChannelPort,
    );

    const command = new DeleteMessageCommand(
      '123',
      '123',
      new UserEntity('312', '123'),
    );

    await expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('DeleteMessageService throws EntityNotFoundError if channel entity not found', async () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const loadMessagePort = createLoadMessageByIdPort();
    const removeMessagePort = createRemoveMessagePort();

    loadChannelPort.loadById.mockResolvedValue(null);

    const deleteService = new DeleteMessageService(
      loadMessagePort,
      removeMessagePort,
      loadChannelPort,
    );

    const command = new DeleteMessageCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    await expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });

  it('DeleteMessageService throws EntityNotFoundError if message entity not found', async () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const loadMessagePort = createLoadMessageByIdPort();
    const removeMessagePort = createRemoveMessagePort();

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('321', 'ChannelName', '123', []),
    );
    loadMessagePort.load.mockResolvedValue(null);

    const deleteService = new DeleteMessageService(
      loadMessagePort,
      removeMessagePort,
      loadChannelPort,
    );

    const command = new DeleteMessageCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    await expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
