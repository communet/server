import { ChatEntity } from '../../../../entities';

export abstract class GetAllChatsByChannelIdQuery {
  abstract getAllByChannelId(channelId: string): Promise<ChatEntity[]>;
}
