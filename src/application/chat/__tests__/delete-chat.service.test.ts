import { EntityNotFoundError } from '../../../application/errors';
import { RemoveChatPort } from '../../../core/ports';
import { DeleteChatService } from '../delete-chat.service';

class MetaMockedRemoveChatPort implements RemoveChatPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(id: string): Promise<string | undefined> {
    throw new Error('Method not implemented');
  }
}

const removeMock = jest
  .spyOn(MetaMockedRemoveChatPort.prototype, 'remove')
  .mockImplementationOnce(() => Promise.resolve('123'))
  .mockImplementationOnce(() => Promise.resolve(undefined));

describe('DeleteChatService tests', () => {
  it('DeleteChatService can be created by passing mock RemoveChatPort and return removed chat id or undefined', async () => {
    const removePort = new MetaMockedRemoveChatPort();
    const deleteService = new DeleteChatService(removePort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(deleteService.delete('123')).resolves.toBeUndefined();

    try {
      await deleteService.delete('123');
    } catch (error) {
      expect(error).toBeInstanceOf(EntityNotFoundError);
    }

    expect(removeMock).toHaveBeenCalledTimes(2);
  });
});
