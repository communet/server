import {
  ChangeChannelNameService,
  CreateChannelService,
  DeleteChannelService,
  GetChannelsByUserIdService,
} from '../../../../application';
import { ChannelEntity } from '../../../../core/entities';
import { IdGeneratorAdapter } from '../../../common';
import { ChannelRepository, db } from '../../../database';
import {
  ChangeChannelNameCommand,
  ChangeChannelNameUseCase,
  CreateChannelCommand,
  CreateChannelUseCase,
  DeleteChannelCommand,
  DeleteChannelUseCase,
  GetChannelsByUserIdQuery,
} from '../.././../../core/ports';
import { ControllerHandlerParams, WithUser } from '../../router';
import { CreateUpdateChannelHandlerParams, WithChannelId } from './types';

class ChannelController {
  constructor(
    private readonly getChannelsByUserIdQuery: GetChannelsByUserIdQuery,
    private readonly createChannelUseCase: CreateChannelUseCase,
    private readonly deleteChannelUseCase: DeleteChannelUseCase,
    private readonly changeChannelNameUseCase: ChangeChannelNameUseCase,
  ) {}

  getChannels({
    user,
  }: WithUser<ControllerHandlerParams>): Promise<ChannelEntity[]> {
    return this.getChannelsByUserIdQuery.getChannelsByUserId(user.id);
  }

  async createChannel({
    request,
    user,
  }: WithUser<CreateUpdateChannelHandlerParams>): Promise<ChannelEntity> {
    const channel = await this.createChannelUseCase.create(
      new CreateChannelCommand(request.body.name, user.id),
    );

    return channel;
  }

  async deleteChannel({
    request,
  }: WithChannelId<ControllerHandlerParams>): Promise<void> {
    await this.deleteChannelUseCase.delete(
      new DeleteChannelCommand(request.params.id),
    );
  }

  async updateChannel({
    request,
  }: WithChannelId<CreateUpdateChannelHandlerParams>): Promise<ChannelEntity> {
    return this.changeChannelNameUseCase.changeName(
      new ChangeChannelNameCommand(request.params.id, request.body.name),
    );
  }
}

export const createChannelController = (): ChannelController => {
  const repository = new ChannelRepository(db);

  return new ChannelController(
    new GetChannelsByUserIdService(repository),
    new CreateChannelService(repository, new IdGeneratorAdapter()),
    new DeleteChannelService(repository),
    new ChangeChannelNameService(repository, repository),
  );
};
