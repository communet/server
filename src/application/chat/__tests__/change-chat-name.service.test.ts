import {
  ChangeChatNameCommand,
  LoadChannelByIdPort,
  LoadChatByIdPort,
  SaveChatPort,
} from '../../../core/ports';
import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';
import { ChangeChatNameService } from '../change-chat-name.service';
import { ChannelEntity, ChatEntity, UserEntity } from '../../../core/entities';

const createLoadChatPort = (): jest.Mocked<LoadChatByIdPort> => {
  return {
    load: jest.fn(),
  };
};

const createSaveChatPort = (): jest.Mocked<SaveChatPort> => {
  return {
    save: jest.fn(),
  };
};

const createLoadChannelPort = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

describe('ChangeChatNameService tests', () => {
  it('ChangeChatNameService successfully update chat entity', () => {
    const loadChatPort = createLoadChatPort();
    const saveChatPort = createSaveChatPort();
    const loadChannelPort = createLoadChannelPort();

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', '123', '123', []),
    );

    loadChatPort.load.mockResolvedValue(
      new ChatEntity('123', '123', '123', []),
    );

    const updatedChatEntity = new ChatEntity('123', 'UpdatedName', '123', []);
    saveChatPort.save.mockResolvedValue(updatedChatEntity);

    const changeService = new ChangeChatNameService(
      loadChatPort,
      saveChatPort,
      loadChannelPort,
    );

    const command = new ChangeChatNameCommand(
      '123',
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).resolves.toStrictEqual(
      updatedChatEntity,
    );
  });

  it('ChangeChatNameService throws AccessViolationError if invoker id does not equals channel creator id', () => {
    const loadChatPort = createLoadChatPort();
    const saveChatPort = createSaveChatPort();
    const loadChannelPort = createLoadChannelPort();

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', '123', '123', []),
    );

    const changeService = new ChangeChatNameService(
      loadChatPort,
      saveChatPort,
      loadChannelPort,
    );

    const command = new ChangeChatNameCommand(
      '123',
      '123',
      '123',
      new UserEntity('312', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('ChangeChatNameService throws EntityNotFoundEntityError if chat entity not found', () => {
    const loadChatPort = createLoadChatPort();
    const saveChatPort = createSaveChatPort();
    const loadChannelPort = createLoadChannelPort();

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', '123', '123', []),
    );
    loadChatPort.load.mockResolvedValue(null);

    const changeService = new ChangeChatNameService(
      loadChatPort,
      saveChatPort,
      loadChannelPort,
    );

    const command = new ChangeChatNameCommand(
      '123',
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });

  it('ChangeChatNameService throws EntityNotFoundEntityError if channel entity not not found', () => {
    const loadChatPort = createLoadChatPort();
    const saveChatPort = createSaveChatPort();
    const loadChannelPort = createLoadChannelPort();

    loadChannelPort.loadById.mockResolvedValue(null);

    const changeService = new ChangeChatNameService(
      loadChatPort,
      saveChatPort,
      loadChannelPort,
    );

    const command = new ChangeChatNameCommand(
      '123',
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
