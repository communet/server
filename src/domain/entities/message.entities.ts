import { v4 as uuid4, UUIDTypes as UUID } from 'uuid';
import { BaseEntity } from '@/domain/entities/base.entities';
import { Profile } from '@/domain/entities/user.entities';
import { Chat } from '@/domain/entities/chat.entities';
import { MessageContent } from '@/domain/values/message.values';

export class Message extends BaseEntity {
  constructor(
    protected _text: MessageContent,
    protected _author: Profile,
    protected _chat: Chat,
    protected _replyTo: Message | undefined = undefined,
    protected _createdAt: Date = new Date(),
    protected _updatedAt: Date = new Date(),
    protected _oid: UUID = uuid4(),
  ) {
    super(_createdAt, _updatedAt, _oid);
  }
}
