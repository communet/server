import {
  ChangeChannelNameCommand,
  LoadChannelByIdPort,
  SaveChannelPort,
} from '../../../core/ports';
import { ChangeChannelNameService } from '../change-channel-name.service';
import { EntityNotFoundError } from '../../../application/errors';
import { ChannelEntity } from '../../../core/entities';

class MetaMockedSaveChannelPort implements SaveChannelPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(channel: ChannelEntity): Promise<ChannelEntity> {
    throw new Error('Method not implemented');
  }
}

const updateChannelEntity = new ChannelEntity(
  '123',
  'New channel name',
  '123',
  [],
);

const saveMock = jest
  .spyOn(MetaMockedSaveChannelPort.prototype, 'save')
  .mockImplementationOnce(() => Promise.resolve(updateChannelEntity));

class MetaMockedLoadChannelByIdPort implements LoadChannelByIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadById(id: string): Promise<ChannelEntity | null> {
    throw new Error('Method not implemented');
  }
}

const loadMock = jest
  .spyOn(MetaMockedLoadChannelByIdPort.prototype, 'loadById')
  .mockImplementationOnce(() =>
    Promise.resolve(new ChannelEntity('123', 'Channel name', '123', [])),
  )
  .mockImplementationOnce(() => Promise.resolve(null));

describe('ChangeChannelNameService tests', () => {
  it('ChangeChannelNameService can be created by passing mock LoadChannelByIdPort and SaveChannelPort port and return modified channel', async () => {
    const saveChannelPort = new MetaMockedSaveChannelPort();
    const loadChannelPort = new MetaMockedLoadChannelByIdPort();

    const changeService = new ChangeChannelNameService(
      saveChannelPort,
      loadChannelPort,
    );
    const command = new ChangeChannelNameCommand('123', 'New channel name');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).resolves.toStrictEqual(
      updateChannelEntity,
    );

    try {
      await changeService.changeName(command);
    } catch (error) {
      expect(error).toBeInstanceOf(EntityNotFoundError);
    }

    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(saveMock).toHaveBeenCalledTimes(1);
  });
});
