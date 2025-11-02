import {
  CreateChannelCommand,
  IdGeneratorPort,
  SaveChannelPort,
} from '../../../core/ports';
import { CreateChannelService } from '../create-channel.service';
import { ChannelEntity } from '../../../core/entities';

const createSaveChannelPort = (): jest.Mocked<SaveChannelPort> => {
  return {
    save: jest.fn(),
  };
};

const createIdGeneratorPort = (): jest.Mocked<IdGeneratorPort> => {
  return {
    generate: jest.fn(),
  };
};

describe('CreateChannelService tests', () => {
  it('CreateChannelService can be created by passing mock SaveChannelPort and IdGeneratorPort and return channel entity', () => {
    const savePort = createSaveChannelPort();
    const idGeneratorPort = createIdGeneratorPort();

    const channelEntity = new ChannelEntity('123', 'Channel name', '123', []);

    savePort.save.mockResolvedValue(channelEntity);
    idGeneratorPort.generate.mockReturnValue('123');

    const createService = new CreateChannelService(savePort, idGeneratorPort);
    const command = new CreateChannelCommand('Channel name', '123');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createService.create(command)).resolves.toStrictEqual(channelEntity);
  });
});
