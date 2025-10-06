import { EntityNotFoundError } from '../../../application/errors';
import { DeleteMessageCommand, RemoveMessagePort } from '../../../core/ports';
import { DeleteMessageService } from '../delete-message.service';

class MetaMockedRemoveMessagePort implements RemoveMessagePort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(id: string): Promise<string | undefined> {
    throw new Error('Method not implemented');
  }
}

const removeMock = jest
  .spyOn(MetaMockedRemoveMessagePort.prototype, 'remove')
  .mockImplementationOnce(() => Promise.resolve('123'))
  .mockImplementationOnce(() => Promise.resolve(undefined));

describe('DeleteMessageService tests', () => {
  it('DeleteMessageService can be created by passing mock RemoveMessagePort and return removed message id or undefined', async () => {
    const deleteCommand = new DeleteMessageCommand('123');

    const removePort = new MetaMockedRemoveMessagePort();
    const deleteService = new DeleteMessageService(removePort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(deleteService.delete(deleteCommand)).resolves.toBeUndefined();

    try {
      await deleteService.delete(deleteCommand);
    } catch (error) {
      expect(error).toBeInstanceOf(EntityNotFoundError);
    }

    expect(removeMock).toHaveBeenCalledTimes(2);
  });
});
