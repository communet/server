import {
  ChangeChannelNameCommand,
  LoadChannelByIdPort,
  SaveChannelPort,
} from '../../../core/ports';
import { ChangeChannelNameService } from '../change-channel-name.service';
import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';
import { ChannelEntity, UserEntity } from '../../../core/entities';

const createLoadChannelByIdPort = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

const createSaveChannelPort = (): jest.Mocked<SaveChannelPort> => {
  return {
    save: jest.fn(),
  };
};

describe('ChangeChannelNameService tests', () => {
  it('ChangeChannelNameService returns updated channel entity if changes succeed', () => {
    const loadPort = createLoadChannelByIdPort();
    const savePort = createSaveChannelPort();

    const channelMockEntity = new ChannelEntity(
      '123',
      'Channel name',
      '123',
      [],
    );
    const updatedChannelMockEntity = new ChannelEntity(
      '123',
      'New channel name',
      '123',
      [],
    );

    loadPort.loadById.mockResolvedValue(channelMockEntity);
    savePort.save.mockResolvedValue(updatedChannelMockEntity);

    const changeService = new ChangeChannelNameService(savePort, loadPort);
    const command = new ChangeChannelNameCommand(
      '123',
      'New channel name',
      new UserEntity('123', 'Admin'),
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).resolves.toStrictEqual(
      updatedChannelMockEntity,
    );
  });

  it('ChangeChannelNameService throws PolicyViolationError fi command invoker has no rights', async () => {
    const loadPort = createLoadChannelByIdPort();
    const savePort = createSaveChannelPort();

    const channel = new ChannelEntity('123', 'Channel name', '321', []);
    loadPort.loadById.mockResolvedValue(channel);

    const changeService = new ChangeChannelNameService(savePort, loadPort);
    const command = new ChangeChannelNameCommand(
      '123',
      'Channel name',
      new UserEntity('123', 'Admin'),
    );

    await expect(changeService.changeName(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('ChangeChannelNameService throws EntityNotFoundError if entity not found', async () => {
    const loadPort = createLoadChannelByIdPort();
    const savePort = createSaveChannelPort();

    loadPort.loadById.mockResolvedValue(null);

    const changeService = new ChangeChannelNameService(savePort, loadPort);
    const command = new ChangeChannelNameCommand(
      '123',
      'Channel name',
      new UserEntity('123', 'Admin'),
    );

    await expect(changeService.changeName(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
