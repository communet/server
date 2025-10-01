import { ChatEntity } from '../../core/entities';
import {
  ChangeChatNameCommand,
  ChangeChatNameUseCase,
  LoadChatByIdPort,
  SaveChatPort,
} from '../../core/ports';
import { EntityNotFoundError } from '../errors';

export class ChangeChatNameService implements ChangeChatNameUseCase {
  constructor(
    private readonly loadChatPort: LoadChatByIdPort,
    private readonly saveChatPort: SaveChatPort,
  ) {}

  async changeName(command: ChangeChatNameCommand): Promise<ChatEntity> {
    const chat = await this.loadChatPort.load(command.id);

    if (!chat) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Chat with id ${command.id} not found`,
        'chat',
      );
    }

    chat.name = command.name;

    return this.saveChatPort.save(chat);
  }
}
