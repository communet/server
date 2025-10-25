import { Entity, MessageEntity } from '../../core/entities';
import {
  ChangeMessageCommand,
  ChangeMessageUseCase,
  LoadMessageByIdPort,
  SaveMessagePort,
} from '../../core/ports';
import { AccessViolationError, EntityNotFoundError } from '../errors';

export class ChangeMessageService implements ChangeMessageUseCase {
  constructor(
    private readonly loadMessageByIdPort: LoadMessageByIdPort,
    private readonly saveMessagePort: SaveMessagePort,
  ) {}

  async change<T extends Entity>(
    command: ChangeMessageCommand<T>,
  ): Promise<MessageEntity> {
    const message = await this.loadMessageByIdPort.load(command.id);

    if (!message) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new EntityNotFoundError(
        `Message with id ${command.id} not found`,
        'message',
      );
    }

    if (message.senderId !== command.invoker.id) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new AccessViolationError(
        `Cannot change content for message with id ${command.id}`,
        'message',
      );
    }

    message.content = command.content;

    return this.saveMessagePort.save(message);
  }
}
