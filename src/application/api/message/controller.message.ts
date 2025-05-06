import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import {
  JwtAuthGuard,
  RequestWithUser,
} from '@/application/api/auth/guards.auth';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import {
  RequestCreateMessageBodyDTO,
  RequestCreateMessageParamsDTO,
  RequestDeleteMessageByParamsIdDTO,
  RequestGetMessageByParamsIdDTO,
  ResponseCreateMessageDTO,
  ResponseGetMessageByIdDTO,
} from '@/application/api/message/schemas.message';
import {
  CreateMessageCommand,
  DeleteMessageByIdCommand,
} from '@/logic/commands/messages.command';
import {
  ICreateMessageCommandHandler,
  IDeleteMessageByIdCommandHandler,
} from '@/infra/nest-providers/command.providers';
import { GetMessageByIdQuery } from '@/logic/queries/message.queries';
import { IGetMessageByIdQueryHandler } from '@/infra/nest-providers/query.providers';

@ApiTags('Messages')
@Controller('/api/channels/{:channelId}/chats/{:chatId}/messages')
export class MessageController {
  constructor(
    @Inject(ICreateMessageCommandHandler)
    protected readonly createMessageCommandHandler: ICreateMessageCommandHandler,

    @Inject(IGetMessageByIdQueryHandler)
    protected readonly getMessageByIdQuryHandler: IGetMessageByIdQueryHandler,

    @Inject(IDeleteMessageByIdCommandHandler)
    protected readonly deleteMessageByIdCommandHandler: IDeleteMessageByIdCommandHandler,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create new message',
    type: ResponseCreateMessageDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Req() req: RequestWithUser,
    @Param() params: RequestCreateMessageParamsDTO,
    @Body() body: RequestCreateMessageBodyDTO,
  ): Promise<ResponseCreateMessageDTO> {
    try {
      const { channelId, chatId } = params;
      const command = new CreateMessageCommand(
        req.user,
        channelId,
        chatId,
        body.content,
        body.reply_to ?? undefined,
      );
      const message = await this.createMessageCommandHandler.execute(command);
      return {
        id: String(message.oid),
        content: message.content,
        author: {
          id: String(req.user.oid),
          display_name: req.user.displayName,
          username: req.user.credentials.username,
          email: req.user.credentials.email,
          avatar: req.user.avatarUrl ?? null,
        },
        reply_to: message.replyTo ?? null,
        created_at: message.createdAt.toISOString(),
        updated_at: message.updatedAt.toISOString(),
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

  @Get('/{:messageId}')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get message by id',
    type: ResponseGetMessageByIdDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async getMessageById(
    @Req() req: RequestWithUser,
    @Param() params: RequestGetMessageByParamsIdDTO,
  ): Promise<ResponseGetMessageByIdDTO> {
    try {
      const { channelId, chatId, messageId } = params;
      const query = new GetMessageByIdQuery(
        String(req.user.oid),
        channelId,
        chatId,
        messageId,
      );
      const message = await this.getMessageByIdQuryHandler.execute(query);
      return {
        id: String(message.oid),
        content: message.content,
        author: {
          id: String(req.user.oid),
          display_name: req.user.displayName,
          username: req.user.credentials.username,
          email: req.user.credentials.email,
          avatar: req.user.avatarUrl ?? null,
        },
        reply_to: message.replyTo ?? null,
        created_at: message.createdAt.toISOString(),
        updated_at: message.updatedAt.toISOString(),
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

  @Delete('/{:messageId}')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Delete message by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async deleteMessageById(
    @Req() req: RequestWithUser,
    @Param() params: RequestDeleteMessageByParamsIdDTO,
  ): Promise<undefined> {
    try {
      const { channelId, chatId, messageId } = params;
      const command = new DeleteMessageByIdCommand(
        String(req.user.oid),
        channelId,
        chatId,
        messageId,
      );
      await this.deleteMessageByIdCommandHandler.execute(command);
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
