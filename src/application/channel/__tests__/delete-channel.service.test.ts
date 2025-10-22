import {
  AccessViolationError,
  EntityNotFoundError,
} from '../../../application/errors';
import { ChannelEntity, UserEntity } from '../../../core/entities';
import {
  DeleteChannelCommand,
  LoadChannelByIdPort,
  RemoveChannelPort,
} from '../../../core/ports';
import { DeleteChannelService } from '../delete-channel.service';

const createLoadChannelByIdPortMock = (): jest.Mocked<LoadChannelByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

const createRemoveChannelPortMock = (): jest.Mocked<RemoveChannelPort> => {
  return {
    remove: jest.fn(),
  };
};

const command = new DeleteChannelCommand('123', new UserEntity('123', 'admin'));

describe('DeleteChannelService tests', () => {
  it('DeleteChannelService returns undefined if deletions succeed', async () => {
    const loadPort = createLoadChannelByIdPortMock();
    const removePort = createRemoveChannelPortMock();

    const sameAuthorId = new ChannelEntity('123', 'Channel name', '123', []);
    loadPort.loadById.mockResolvedValue(sameAuthorId);
    removePort.remove.mockResolvedValue('123');

    const deleteService = new DeleteChannelService(removePort, loadPort);

    const result = await deleteService.delete(command);

    expect(result).toBeUndefined();
  });

  it('DeleteChannelService throws PolicyViolationError if command invoker has no rights', async () => {
    const loadPort = createLoadChannelByIdPortMock();
    const removePort = createRemoveChannelPortMock();

    const notSameAuthorId = new ChannelEntity(
      '123',
      'Channel name',
      '1234',
      [],
    );
    loadPort.loadById.mockResolvedValue(notSameAuthorId);

    const deleteService = new DeleteChannelService(removePort, loadPort);

    await expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      AccessViolationError,
    );
  });

  it('DeleteChannelService throws EntityNotFoundError if entity not found', async () => {
    const loadPort = createLoadChannelByIdPortMock();
    const removePort = createRemoveChannelPortMock();

    loadPort.loadById.mockResolvedValue(null);

    const deleteService = new DeleteChannelService(removePort, loadPort);

    await expect(deleteService.delete(command)).rejects.toBeInstanceOf(
      EntityNotFoundError,
    );
  });
});
