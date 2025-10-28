import { ChatEntity, Entity } from '../../core/entities';
import {
  ChangeChatNameCommand,
  ChangeChatNameUseCase,
  LoadChannelByIdPort,
  LoadChatByIdPort,
  SaveChatPort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class ChangeChatNameService implements ChangeChatNameUseCase {
  constructor(
    private readonly loadChatPort: LoadChatByIdPort,
    private readonly saveChatPort: SaveChatPort,
    private readonly loadChannelPort: LoadChannelByIdPort,
  ) {}

  async changeName<T extends Entity>(
    command: ChangeChatNameCommand<T>,
  ): Promise<ChatEntity> {
    const channel = await this.loadChannelPort.loadById(command.channelId);
    if (!channel) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Channel with id ${command.channelId} not found`,
        'channel',
      );
    }

    if (command.invoker.id !== channel.creatorId) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new AccessViolationError(
        `Cannot change chat name with id ${command.id}`,
        'chat',
      );
    }

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
