import {
  ChangeChatNameService,
  CreateChatService,
  DeleteChatService,
  GetAllChatsByChannelIdService,
} from '../../../../application';
import { ChatEntity } from '../../../../core/entities';
import {
  ChangeChatNameCommand,
  ChangeChatNameUseCase,
  CreateChatCommand,
  CreateChatUseCase,
  DeleteChatCommand,
  DeleteChatUseCase,
  GetAllChatsByChannelIdQuery,
} from '../../../../core/ports';
import { IdGeneratorAdapter } from '../../../../infra/common';
import {
  ChannelRepository,
  ChatRepository,
  db,
} from '../../../../infra/database';
import { ControllerHandlerParams, WithUser } from '../../router';
import {
  CreateChatHandlerParams,
  UpdateDeleteChatHandlerParams,
  WithChannelId,
} from './types';

class ChatController {
  constructor(
    private readonly getAllChatByChannelIdQuery: GetAllChatsByChannelIdQuery,
    private readonly changeChatNameUseCase: ChangeChatNameUseCase,
    private readonly createChatUseCase: CreateChatUseCase,
    private readonly deleteChatUseCase: DeleteChatUseCase,
  ) {}

  getAllChatsByChannelId({
    request,
  }: WithChannelId<ControllerHandlerParams>): Promise<ChatEntity[]> {
    return this.getAllChatByChannelIdQuery.getAllByChannelId(
      request.params.channelId,
    );
  }

  changeChatName({
    request,
    user,
  }: WithUser<UpdateDeleteChatHandlerParams>): Promise<ChatEntity> {
    return this.changeChatNameUseCase.changeName(
      new ChangeChatNameCommand(
        request.params.id,
        request.body.name,
        request.params.channelId,
        user,
      ),
    );
  }

  createChat({
    request,
    user,
  }: WithUser<CreateChatHandlerParams>): Promise<ChatEntity> {
    return this.createChatUseCase.create(
      new CreateChatCommand(request.body.name, request.params.channelId, user),
    );
  }

  async deleteChat({
    request,
    user,
  }: WithUser<UpdateDeleteChatHandlerParams>): Promise<void> {
    await this.deleteChatUseCase.delete(
      new DeleteChatCommand(request.params.id, request.params.channelId, user),
    );
  }
}

export const createChatController = (): ChatController => {
  const chatRepository = new ChatRepository(db);
  const channelRepository = new ChannelRepository(db);

  return new ChatController(
    new GetAllChatsByChannelIdService(chatRepository),
    new ChangeChatNameService(
      chatRepository,
      chatRepository,
      channelRepository,
    ),
    new CreateChatService(
      chatRepository,
      channelRepository,
      new IdGeneratorAdapter(),
    ),
    new DeleteChatService(chatRepository, channelRepository),
  );
};
