import { BaseValue } from '@/domain/values/base.values';
import {
  MessageEmptyError,
  MessageTooLongError,
} from '@/domain/exceptions/message.exceptions';

export class MessageContent extends BaseValue<string> {
  constructor(value: string) {
    super(value.trim());
  }

  protected validate(): undefined {
    const max_length = 32;

    if (!this.value.length) {
      throw new MessageEmptyError('Message cannot be empty');
    }
    if (this.value.length > max_length) {
      throw new MessageTooLongError(
        `Message must be less or equal to ${max_length} characters`,
      );
    }
  }
}
