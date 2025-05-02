import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Inject,
  UseGuards,
  Req,
  Param,
  Body,
  HttpCode,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import {
  ICreateChatCommandHandler,
  IDeleteChatCommandHandler,
  IUpdateChatCommandHandler,
} from '@/infra/nest-providers/command.providers';
import {
  JwtAuthGuard,
  RequestWithUser,
} from '@/application/api/auth/guards.auth';
import {
  RequestCreateChatBodyDTO,
  RequestCreateChatParamsDTO,
  RequestDeleteChatParamsDTO,
  RequestGetChatParamsDTO,
  RequestGetChatsParamsDTO,
  RequestUpdateChatBodyDTO,
  RequestUpdateChatParamsDTO,
  ResponseCreateChatDTO,
  ResponseGetChatByIdDTO,
  ResponseGetChatsDTO,
  ResponseUpdateChatDTO,
} from '@/application/api/chats/schemas.chats';
import {
  CreateChatCommand,
  DeleteChatCommand,
  UpdateChatCommand,
} from '@/logic/commands/chats.command';
import { ChatType } from '@/infra/database/models/chat.model';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import {
  IGetChatByIdQueryHandler,
  IGetChatsQueryHandler,
} from '@/infra/nest-providers/query.providers';
import { GetChatByIdQuery, GetChatsQuery } from '@/logic/queries/chats.queries';

@ApiTags('Chats')
@Controller('/api/channels')
export class ChatsController {
  constructor(
    @Inject(IGetChatsQueryHandler)
    protected readonly getChatsQueryHandler: IGetChatsQueryHandler,

    @Inject(IGetChatByIdQueryHandler)
    protected readonly getChatByIdQueryHandler: IGetChatByIdQueryHandler,

    @Inject(ICreateChatCommandHandler)
    protected readonly createChatCommandHandler: ICreateChatCommandHandler,

    @Inject(IUpdateChatCommandHandler)
    protected readonly updateChatCommandHandler: IUpdateChatCommandHandler,

    @Inject(IDeleteChatCommandHandler)
    protected readonly deleteChatCommandHandler: IDeleteChatCommandHandler,
  ) {}

  @Get('/{:channelId}/chats')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get all channel chats',
    type: ResponseGetChatsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async getChats(
    @Req() req: RequestWithUser,
    @Param() params: RequestGetChatsParamsDTO,
  ): Promise<ResponseGetChatsDTO> {
    try {
      const { channelId } = params;
      const query = new GetChatsQuery(String(req.user.oid), channelId);
      const chats = await this.getChatsQueryHandler.execute(query);
      const formattedChats = chats.map((chat) => ({
        id: String(chat.oid),
        name: chat.name,
        type: chat.type,
        chanenl_id: String(chat.channel.oid),
        created_at: chat.createdAt.toISOString(),
        updated_at: chat.updatedAt.toISOString(),
      }));
      return formattedChats;
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/{:channelId}/chats/{:chatId}')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get exist channel by id',
    type: ResponseGetChatByIdDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async getChatById(
    @Req() req: RequestWithUser,
    @Param() params: RequestGetChatParamsDTO,
  ): Promise<ResponseGetChatByIdDTO> {
    try {
      const { channelId, chatId } = params;
      const query = new GetChatByIdQuery(
        String(req.user.oid),
        channelId,
        chatId,
      );
      const chat = await this.getChatByIdQueryHandler.execute(query);
      return {
        id: String(chat.oid),
        name: chat.name,
        type: chat.type,
        chanenl_id: String(chat.channel.oid),
        created_at: chat.createdAt.toISOString(),
        updated_at: chat.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/{:channelId}/chats')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create new text/voice chat for channel',
    type: ResponseCreateChatDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async createChat(
    @Req() req: RequestWithUser,
    @Param() params: RequestCreateChatParamsDTO,
    @Body() body: RequestCreateChatBodyDTO,
  ): Promise<ResponseCreateChatDTO> {
    try {
      const { channelId } = params;

      const chatType = body.type === 'voice' ? ChatType.VOICE : ChatType.TEXT;
      const command = new CreateChatCommand(
        body.name,
        chatType,
        channelId,
        String(req.user.oid),
      );
      const chat = await this.createChatCommandHandler.execute(command);
      return {
        id: String(chat.oid),
        name: chat.name,
        type: chat.type,
        chanenl_id: String(chat.channel.oid),
        created_at: chat.createdAt.toISOString(),
        updated_at: chat.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/{:channelId}/chats/{:chatId}')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Update chat by id',
    type: ResponseUpdateChatDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async updateChat(
    @Req() req: RequestWithUser,
    @Param() params: RequestUpdateChatParamsDTO,
    @Body() body: RequestUpdateChatBodyDTO,
  ): Promise<ResponseUpdateChatDTO> {
    try {
      const { channelId, chatId } = params;
      const command = new UpdateChatCommand(
        String(req.user.oid),
        channelId,
        chatId,
        body.name,
        body.type,
      );
      const chat = await this.updateChatCommandHandler.execute(command);
      return {
        id: String(chat.oid),
        name: chat.name,
        type: chat.type,
        chanenl_id: String(chat.channel.oid),
        created_at: chat.createdAt.toISOString(),
        updated_at: chat.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/{:channelId}/chats/{:chatId}')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Delete chat by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async deleteChatById(
    @Req() req: RequestWithUser,
    @Param() params: RequestDeleteChatParamsDTO,
  ): Promise<undefined> {
    try {
      const { channelId, chatId } = params;
      const command = new DeleteChatCommand(
        channelId,
        chatId,
        String(req.user.oid),
      );
      await this.deleteChatCommandHandler.execute(command);
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
