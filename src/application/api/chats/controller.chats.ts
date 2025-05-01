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
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import {
  ICreateChatCommandHandler,
  IDeleteChatCommandHandler,
} from '@/infra/nest-providers/command.providers';
import {
  JwtAuthGuard,
  RequestWithUser,
} from '@/application/api/auth/guards.auth';
import {
  RequestCreateChatBodyDTO,
  RequestCreateChatParamsDTO,
  RequestDeleteChatParamsDTO,
  ResponseCreateChatDTO,
} from '@/application/api/chats/schemas.chats';
import {
  CreateChatCommand,
  DeleteChatCommand,
} from '@/logic/commands/chats.command';
import { ChatType } from '@/infra/database/models/chat.model';
import { ResponseErrorDTO } from '@/application/api/base.schemas';

@ApiTags('Chats')
@Controller('/api/channels')
export class ChatsController {
  constructor(
    @Inject(ICreateChatCommandHandler)
    protected readonly createChatCommandHandler: ICreateChatCommandHandler,

    @Inject(IDeleteChatCommandHandler)
    protected readonly deleteChatCommandHandler: IDeleteChatCommandHandler,
  ) {}

  @Post('/{:channelId}/chats')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create new text/voice chat for channel',
    type: RequestCreateChatBodyDTO,
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
