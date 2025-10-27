import { ChannelEntity, UserEntity } from '../../../core/entities';
import {
  DeleteChatCommand,
  LoadChannelByIdPort,
  RemoveChatPort,
} from '../../../core/ports';
import { DeleteChatService } from '../delete-chat.service';
import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';

const createLoadChannelByIdPort = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

const createRemoveChatPort = (): jest.Mocked<RemoveChatPort> => {
  return {
    remove: jest.fn(),
  };
};

describe('DeleteChatService tests', () => {
  it('DeleteChatService successfully delete chat if invoker id equals channel creator id', async () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const removeChatPort = createRemoveChatPort();

    removeChatPort.remove.mockResolvedValue('123');
    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', 'Channel name', '123', []),
    );

    const deleteService = new DeleteChatService(
      removeChatPort,
      loadChannelPort,
    );

    const command = new DeleteChatCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    const deleteResult = await deleteService.delete(command);
    expect(deleteResult).toBeUndefined();
  });

  it('DeleteChatService thorws AccessViolationError if invoker id does not equals channel creator id', () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const removeChatPort = createRemoveChatPort();

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', 'Channel name', '123', []),
    );

    const deleteService = new DeleteChatService(
      removeChatPort,
      loadChannelPort,
    );

    const command = new DeleteChatCommand(
      '123',
      '123',
      new UserEntity('321', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('DeleteChatService throws EntityNotFoundError if message entity not found', () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const removeChatPort = createRemoveChatPort();

    removeChatPort.remove.mockResolvedValue(undefined);
    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', 'Channel name', '123', []),
    );

    const deleteService = new DeleteChatService(
      removeChatPort,
      loadChannelPort,
    );

    const command = new DeleteChatCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });

  it('DeleteChatService throws EntityNotFoundError if channel entity not found', () => {
    const loadChannelPort = createLoadChannelByIdPort();
    const removeChatPort = createRemoveChatPort();

    loadChannelPort.loadById.mockResolvedValue(null);

    const deleteService = new DeleteChatService(
      removeChatPort,
      loadChannelPort,
    );

    const command = new DeleteChatCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
