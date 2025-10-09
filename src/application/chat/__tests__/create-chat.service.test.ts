import { ChatEntity } from '../../../core/entities';
import {
  CreateChatCommand,
  IdGeneratorPort,
  SaveChatPort,
} from '../../../core/ports';
import { CreateChatService } from '../create-chat.service';

class MetaMockedSaveChatPort implements SaveChatPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(chat: ChatEntity): Promise<ChatEntity> {
    throw new Error('Method not implemented');
  }
}

const chatEntity = new ChatEntity('123', 'Chat name', '123', []);

const saveMock = jest
  .spyOn(MetaMockedSaveChatPort.prototype, 'save')
  .mockImplementationOnce(() => Promise.resolve(chatEntity));

class MetaMockedIdGeneratorPort implements IdGeneratorPort {
  generate(): string {
    throw new Error('Method not implemented');
  }
}

const idGeneratorMock = jest
  .spyOn(MetaMockedIdGeneratorPort.prototype, 'generate')
  .mockImplementationOnce(() => '123');

describe('CreateChatService tests', () => {
  it('CreateChatService can be created by passing mock SeveChatPort and IdGeneratorPort and return chat entity', () => {
    const savePort = new MetaMockedSaveChatPort();
    const idGeneratorPort = new MetaMockedIdGeneratorPort();

    const createService = new CreateChatService(savePort, idGeneratorPort);
    const command = new CreateChatCommand('Chat name', '123');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createService.create(command)).resolves.toStrictEqual(chatEntity);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(idGeneratorMock).toHaveBeenCalledTimes(1);
  });
});
