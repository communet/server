import { ChatEntity } from '../../../entities';

export abstract class LoadChatsByChannelIdPort {
  abstract loadByChannelId(channelId: string): Promise<ChatEntity[]>;
}
