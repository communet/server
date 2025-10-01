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
  DeleteChatUseCase,
  GetAllChatsByChannelIdQuery,
} from '../../../../core/ports';
import { IdGeneratorAdapter } from '../../../../infra/common';
import { ChatRepository, db } from '../../../../infra/database';
import { ControllerHandlerParams } from '../../router';
import {
  CreateChatHandlerParams,
  UpdateChatHandlerParams,
  WithChannelId,
  WithChatId,
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

  // TODO: check by channel id
  changeChatName({ request }: UpdateChatHandlerParams): Promise<ChatEntity> {
    return this.changeChatNameUseCase.changeName(
      new ChangeChatNameCommand(request.params.id, request.body.name),
    );
  }

  createChat({ request }: CreateChatHandlerParams): Promise<ChatEntity> {
    return this.createChatUseCase.create(
      new CreateChatCommand(request.body.name, request.params.channelId),
    );
  }

  // TODO: check by channel id
  async deleteChat({
    request,
  }: WithChannelId<WithChatId<ControllerHandlerParams>>): Promise<void> {
    await this.deleteChatUseCase.delete(request.params.id);
  }
}

export const createChatController = (): ChatController => {
  const repository = new ChatRepository(db);

  return new ChatController(
    new GetAllChatsByChannelIdService(repository),
    new ChangeChatNameService(repository, repository),
    new CreateChatService(repository, new IdGeneratorAdapter()),
    new DeleteChatService(repository),
  );
};
