import {
  CreateChannelCommand,
  IdGeneratorPort,
  SaveChannelPort,
} from '../../../core/ports';
import { CreateChannelService } from '../create-channel.service';
import { ChannelEntity } from '../../../core/entities';

class MetaMockedSaveChannelPort implements SaveChannelPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(channel: ChannelEntity): Promise<ChannelEntity> {
    throw new Error('Method not implemented');
  }
}

const channelEntity = new ChannelEntity('123', 'Channel name', '123', []);

const saveMock = jest
  .spyOn(MetaMockedSaveChannelPort.prototype, 'save')
  .mockImplementationOnce(() => Promise.resolve(channelEntity));

class MetaMockedIdGeneratorPort implements IdGeneratorPort {
  generate(): string {
    throw new Error('Method not implemented');
  }
}

const idGeneratorMock = jest
  .spyOn(MetaMockedIdGeneratorPort.prototype, 'generate')
  .mockImplementationOnce(() => '123');

describe('CreateChannelService tests', () => {
  it('CreateChannelService can be created by passing mock SaveChannelPort and IdGeneratorPort and return channel entity', () => {
    const savePort = new MetaMockedSaveChannelPort();
    const idGeneratorPort = new MetaMockedIdGeneratorPort();

    const createService = new CreateChannelService(savePort, idGeneratorPort);
    const command = new CreateChannelCommand('Channel name', '123');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createService.create(command)).resolves.toStrictEqual(channelEntity);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(idGeneratorMock).toHaveBeenCalledTimes(1);
  });
});
