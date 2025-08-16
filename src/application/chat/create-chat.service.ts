import { ChatEntity } from '../../core/entities';
import {
  CreateChatCommand,
  CreateChatUseCase,
  IdGeneratorPort,
  SaveChatPort,
} from '../../core/ports';

export class CreateChatService implements CreateChatUseCase {
  constructor(
    private readonly saveChatPort: SaveChatPort,
    private readonly idGeneratorPort: IdGeneratorPort,
  ) {}

  create(command: CreateChatCommand): Promise<ChatEntity> {
    const chat = new ChatEntity(
      this.idGeneratorPort.generate(),
      command.name,
      command.channelId,
    );

    return this.saveChatPort.save(chat);
  }
}
