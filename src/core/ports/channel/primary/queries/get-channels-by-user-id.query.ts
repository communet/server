import { ChannelEntity } from '../../../../entities';

export abstract class GetChannelsByUserIdQuery {
  abstract getChannelsByUserId(id: string): Promise<ChannelEntity[]>;
}
