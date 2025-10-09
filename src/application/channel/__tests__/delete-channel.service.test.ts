import { EntityNotFoundError } from '../../../application/errors';
import { DeleteChannelCommand, RemoveChannelPort } from '../../../core/ports';
import { DeleteChannelService } from '../delete-channel.service';

class MetaMockedRemoveChannelPort implements RemoveChannelPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(id: string): Promise<string | undefined> {
    throw new Error('Method not implemented');
  }
}

const removeMock = jest
  .spyOn(MetaMockedRemoveChannelPort.prototype, 'remove')
  .mockImplementationOnce(() => Promise.resolve('123'))
  .mockImplementationOnce(() => Promise.resolve(undefined));

describe('DeleteChannelService tests', () => {
  it('DeleteChannelService can be created by passing mock RemoveChannelPort and return removed channel id or undefined', async () => {
    const removePort = new MetaMockedRemoveChannelPort();
    const deleteService = new DeleteChannelService(removePort);
    const command = new DeleteChannelCommand('123');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(deleteService.delete(command)).resolves.toBeUndefined();

    try {
      await deleteService.delete(command);
    } catch (error) {
      expect(error).toBeInstanceOf(EntityNotFoundError);
    }

    expect(removeMock).toHaveBeenCalledTimes(2);
  });
});
