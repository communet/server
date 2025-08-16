import { ChatEntity } from '../../core/entities';
import {
  GetAllChatsByChannelIdQuery,
  LoadChatsByChannelIdPort,
} from '../../core/ports';

export class GetAllChatsByChannelIdService
  implements GetAllChatsByChannelIdQuery
{
  constructor(
    private readonly loadChatsByChannelIdPort: LoadChatsByChannelIdPort,
  ) {}

  getAllByChannelId(channelId: string): Promise<ChatEntity[]> {
    return this.loadChatsByChannelIdPort.loadByChannelId(channelId);
  }
}
