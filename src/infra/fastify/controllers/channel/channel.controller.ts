import {
  CreateChannelService,
  GetChannelsByUserIdService,
} from '../../../../application';
import { ChannelEntity } from '../../../../core/entities';
import { IdGeneratorAdapter } from '../../../common';
import { ChannelRepository, db } from '../../../database';
import {
  CreateChannelUseCase,
  GetChannelsByUserIdQuery,
} from '../.././../../core/ports';
import { ControllerHandlerParams, WithUser } from '../../router';
import { CreateChannelRequest } from './types';

export class ChannelController {
  constructor(
    private readonly getChannelsByUserIdQuery: GetChannelsByUserIdQuery,
    private readonly createChannelUseCase: CreateChannelUseCase,
  ) {}

  getChannels({
    user,
  }: WithUser<ControllerHandlerParams>): Promise<ChannelEntity[]> {
    return this.getChannelsByUserIdQuery.getChannelsByUserId(user.id);
  }

  async createChannel({
    request,
    user,
  }: WithUser<
    ControllerHandlerParams<CreateChannelRequest>
  >): Promise<ChannelEntity> {
    const channel = await this.createChannelUseCase.create({
      name: request.body.name,
      creatorId: user.id,
    });

    return channel;
  }
}

const repository = new ChannelRepository(db);

export const createChannelController = (): ChannelController =>
  new ChannelController(
    new GetChannelsByUserIdService(repository),
    new CreateChannelService(repository, new IdGeneratorAdapter()),
  );
