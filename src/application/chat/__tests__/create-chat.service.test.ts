import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';
import { ChannelEntity, ChatEntity, UserEntity } from '../../../core/entities';
import {
  CreateChatCommand,
  IdGeneratorPort,
  LoadChannelByIdPort,
  SaveChatPort,
} from '../../../core/ports';
import { CreateChatService } from '../create-chat.service';

const createLoadChannelPort = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

const createSaveChatPort = (): jest.Mocked<SaveChatPort> => {
  return {
    save: jest.fn(),
  };
};

const createIdGeneratorPort = (): jest.Mocked<IdGeneratorPort> => {
  return {
    generate: jest.fn(),
  };
};

describe('CreateChatService tests', () => {
  it('CreateChatService successfully create a new chat', () => {
    const loadChannelPort = createLoadChannelPort();
    const saveChatPort = createSaveChatPort();
    const idGeneratorPort = createIdGeneratorPort();

    idGeneratorPort.generate.mockReturnValue('123');
    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', '123', '123', []),
    );

    const createdChatEntity = new ChatEntity('123', 'Chat name', '123', []);
    saveChatPort.save.mockResolvedValue(createdChatEntity);

    const createService = new CreateChatService(
      saveChatPort,
      loadChannelPort,
      idGeneratorPort,
    );

    const command = new CreateChatCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createService.create(command)).resolves.toStrictEqual(
      createdChatEntity,
    );
  });

  it('CreateChatService throws AccessViolationError if invoker id does not equals channel creator id', () => {
    const loadChannelPort = createLoadChannelPort();
    const saveChatPort = createSaveChatPort();
    const idGeneratorPort = createIdGeneratorPort();

    loadChannelPort.loadById.mockResolvedValue(
      new ChannelEntity('123', '123', '123', []),
    );

    const createService = new CreateChatService(
      saveChatPort,
      loadChannelPort,
      idGeneratorPort,
    );

    const command = new CreateChatCommand(
      '123',
      '123',
      new UserEntity('321', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createService.create(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('CreateChatService throws EntityNotFoundError if channel entity not found', () => {
    const loadChannelPort = createLoadChannelPort();
    const saveChatPort = createSaveChatPort();
    const idGeneratorPort = createIdGeneratorPort();

    loadChannelPort.loadById.mockResolvedValue(null);

    const createService = new CreateChatService(
      saveChatPort,
      loadChannelPort,
      idGeneratorPort,
    );

    const command = new CreateChatCommand(
      '123',
      '123',
      new UserEntity('123', '123'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createService.create(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
