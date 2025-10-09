import {
  ChangeChatNameCommand,
  LoadChatByIdPort,
  SaveChatPort,
} from '../../../core/ports';
import { EntityNotFoundError } from '../../../application/errors';
import { ChangeChatNameService } from '../change-chat-name.service';
import { ChatEntity } from '../../../core/entities';

class MetaMockedLoadChatPort implements LoadChatByIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(id: string): Promise<ChatEntity | null> {
    throw new Error('Method not implemented');
  }
}

const loadMock = jest
  .spyOn(MetaMockedLoadChatPort.prototype, 'load')
  .mockImplementationOnce(() =>
    Promise.resolve(new ChatEntity('123', 'Chat name', '123', [])),
  )
  .mockImplementationOnce(() => Promise.resolve(null));

class MetaMockedSaveChatPort implements SaveChatPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(chat: ChatEntity): Promise<ChatEntity> {
    throw new Error('Method not implemented');
  }
}

const updateChatEntity = new ChatEntity('123', 'New chat name', '123', []);

const saveMock = jest
  .spyOn(MetaMockedSaveChatPort.prototype, 'save')
  .mockImplementationOnce(() => Promise.resolve(updateChatEntity));

describe('ChangeChatNameService tests', () => {
  it('ChangeChatNameService can be created by passing mock LoadChatByIdPort and SaveChatPort port and return modified chat', async () => {
    const loadChatPort = new MetaMockedLoadChatPort();
    const saveChatPort = new MetaMockedSaveChatPort();

    const changeService = new ChangeChatNameService(loadChatPort, saveChatPort);
    const command = new ChangeChatNameCommand('123', 'New chat name');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(changeService.changeName(command)).resolves.toStrictEqual(
      updateChatEntity,
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
