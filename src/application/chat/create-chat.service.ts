import { ChatEntity, Entity } from '../../core/entities';
import {
  CreateChatCommand,
  CreateChatUseCase,
  IdGeneratorPort,
  LoadChannelByIdPort,
  SaveChatPort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class CreateChatService implements CreateChatUseCase {
  constructor(
    private readonly saveChatPort: SaveChatPort,
    private readonly loadChannelPort: LoadChannelByIdPort,
    private readonly idGeneratorPort: IdGeneratorPort,
  ) {}

  async create<T extends Entity>(
    command: CreateChatCommand<T>,
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
      throw new AccessViolationError(`Cannot create a new chat`, 'chat');
    }

    const chat = new ChatEntity(
      this.idGeneratorPort.generate(),
      command.name,
      command.channelId,
    );

    return await this.saveChatPort.save(chat);
  }
}
