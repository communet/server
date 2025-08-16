import { MessageEntity } from '../../core/entities';
import {
  ChangeMessageCommand,
  ChangeMessageUseCase,
  LoadMessageByIdPort,
  SaveMessagePort,
} from '../../core/ports';
import { EntityNotFoundError } from '../errors';

export class ChangeMessageService implements ChangeMessageUseCase {
  constructor(
    private readonly loadMessageByIdPort: LoadMessageByIdPort,
    private readonly saveMessagePort: SaveMessagePort,
  ) {}

  async change(command: ChangeMessageCommand): Promise<MessageEntity> {
    const message = await this.loadMessageByIdPort.load(command.id);

    if (!message) {
      throw new EntityNotFoundError(`Message with id ${command.id} not found`);
    }

    message.body = command.body;

    return this.saveMessagePort.save(message);
  }
}
