import { ChannelEntity } from '../../../../entities';

export abstract class GetChannelByIdQuery {
  abstract getChannelById(id: string): Promise<ChannelEntity | null>;
}
