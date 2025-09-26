import { GetChannelsByUserIdService } from '../../../../application';
import { ChannelEntity } from '../../../../core/entities';
import { ChannelRepository, db } from '../../../database';
import { GetChannelsByUserIdQuery } from '../.././../../core/ports';
import { ControllerHandlerParams, WithUser } from '../../router/common';

export class ChannelController {
  constructor(
    private readonly getChannelsByUserIdQuery: GetChannelsByUserIdQuery,
  ) {}

  getChannels({
    user,
  }: WithUser<ControllerHandlerParams>): Promise<ChannelEntity[]> {
    console.log({ user });
    return this.getChannelsByUserIdQuery.getChannelsByUserId(user.id);
  }
}

export const createChannelController = (): ChannelController =>
  new ChannelController(
    new GetChannelsByUserIdService(new ChannelRepository(db)),
  );
