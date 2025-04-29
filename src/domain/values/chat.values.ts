import { BaseValue } from '@/domain/values/base.values';
import {
  ChatNameEmptyError,
  ChatNameTooLongError,
  ChatNameTooShortError,
  ChatTypeEmptyError,
  InvalidChatTypeError,
} from '@/domain/exceptions/chats.exceptions';

export class ChatName extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    const min_length = 3;
    const max_length = 32;

    if (!this.value) {
      throw new ChatNameEmptyError('Name cannot be empty');
    }
    if (this.value.length < min_length) {
      throw new ChatNameTooShortError(
        `Name must be greater or equal to ${min_length} characters`,
      );
    }
    if (this.validate.length > max_length) {
      throw new ChatNameTooLongError(
        `Username must be less or equal to ${max_length} characters`,
      );
    }
  }
}

export class ChatTypeVT extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    const validChatTypeValues = ['text', 'voice'];

    if (!this.value) {
      throw new ChatTypeEmptyError('Type cannot be empty');
    }
    if (!validChatTypeValues.includes(this.value)) {
      throw new InvalidChatTypeError(`Chat type cannot be ${this.value}`);
    }
  }
}
