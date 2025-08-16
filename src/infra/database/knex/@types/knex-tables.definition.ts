import { Channel, Chat, Message, User } from './tables';

// NOTE: https://knexjs.org/guide/#typescript
declare module 'knex/types/tables' {
  // NOTE: Будет расширяться в дальнейшем

  interface Tables {
    users: User;
    channels: Channel;
    chats: Chat;
    messages: Message;
  }
}
