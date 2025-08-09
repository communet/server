import { MessageEntity } from '../../../entities';

export abstract class SaveMessagePort {
  abstract save(message: MessageEntity): Promise<MessageEntity>;
}
