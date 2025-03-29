import { BaseValue } from '@/domain/values/base.values';
import {
  ChannelNameEmptyError,
  ChannelNameTooLongError,
  ChannelNameTooShortError,
} from '@/domain/exceptions/channels.exceptions';

export class ChannelName extends BaseValue<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): undefined {
    const min_length = 3;
    const max_length = 32;

    if (!this.value) {
      throw new ChannelNameEmptyError('Name cannot be empty');
    }
    if (this.value.length < min_length) {
      throw new ChannelNameTooShortError(
        `Name must be greater or equal to ${min_length} characters`,
      );
    }
    if (this.validate.length > max_length) {
      throw new ChannelNameTooLongError(
        `Username must be less or equal to ${max_length} characters`,
      );
    }
  }
}
