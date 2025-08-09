import { ChatEntity } from '../../../../entities';

export abstract class GetAllChatsQuery {
  abstract getAllByChannelId(channelId: string): Promise<ChatEntity[]>;
}
