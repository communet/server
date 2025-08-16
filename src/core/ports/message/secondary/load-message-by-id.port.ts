import { MessageEntity } from '../../../entities';

export abstract class LoadMessageByIdPort {
  abstract load(id: string): Promise<MessageEntity | null>;
}
