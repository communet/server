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
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  RequestGetAllMessagesParamsDTO,
  RequestGetMessageByParamsIdDTO,
  RequestUpdateMessageByIdBodyDTO,
  RequestUpdateMessageByIdParamsIdDTO,
  ResponseCreateMessageDTO,
  ResponseGetAllMessagesDTO,
  ResponseGetMessageByIdDTO,
  ResponseUpdateMessageByIdDTO,
} from '@/application/api/message/schemas.message';
import {
  CreateMessageCommand,
  DeleteMessageByIdCommand,
  UpdateMessageByIdCommand,
} from '@/logic/commands/messages.command';
import {
  ICreateMessageCommandHandler,
  IDeleteMessageByIdCommandHandler,
  IUpdateMessageByIdCommandHandler,
} from '@/infra/nest-providers/command.providers';
import {
  GetAllMessagesQuery,
  GetMessageByIdQuery,
} from '@/logic/queries/message.queries';
import {
  IGetAllMessagesQueryHandler,
  IGetMessageByIdQueryHandler,
} from '@/infra/nest-providers/query.providers';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('/api/channels/{:channelId}/chats/{:chatId}/messages')
export class MessageController {
  constructor(
    @Inject(IGetAllMessagesQueryHandler)
    protected readonly getAllMessagesQueryHandler: IGetAllMessagesQueryHandler,

    @Inject(ICreateMessageCommandHandler)
    protected readonly createMessageCommandHandler: ICreateMessageCommandHandler,

    @Inject(IGetMessageByIdQueryHandler)
    protected readonly getMessageByIdQuryHandler: IGetMessageByIdQueryHandler,

    @Inject(IUpdateMessageByIdCommandHandler)
    protected readonly updateMessageByIdCommandHandler: IUpdateMessageByIdCommandHandler,

    @Inject(IDeleteMessageByIdCommandHandler)
    protected readonly deleteMessageByIdCommandHandler: IDeleteMessageByIdCommandHandler,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get all messages from chat',
    type: ResponseGetAllMessagesDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async getAllMessages(
    @Req() req: RequestWithUser,
    @Param() params: RequestGetAllMessagesParamsDTO,
  ): Promise<ResponseGetAllMessagesDTO> {
    const { channelId, chatId } = params;
    const query = new GetAllMessagesQuery(req.user, channelId, chatId);
    const messages = await this.getAllMessagesQueryHandler.execute(query);
    return messages.map((message) => ({
      id: String(message.oid),
      content: message.content,
      author: {
        id: String(message.author.oid),
        display_name: message.author.displayName,
        username: message.author.credentials.username,
        email: message.author.credentials.email,
        avatar: message.author.avatarUrl ?? null,
        created_at: message.author.createdAt.toISOString(),
        updated_at: message.author.updatedAt.toISOString(),
      },
      reply_to: message.replyTo ?? null,
      created_at: message.createdAt.toISOString(),
      updated_at: message.updatedAt.toISOString(),
    }));
  }

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
          created_at: req.user.createdAt.toISOString(),
          updated_at: req.user.updatedAt.toISOString(),
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
          created_at: req.user.createdAt.toISOString(),
          updated_at: req.user.updatedAt.toISOString(),
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

  @Patch('/{:messageId}')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Update message by id',
    type: ResponseUpdateMessageByIdDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async updateMessageById(
    @Req() req: RequestWithUser,
    @Param() params: RequestUpdateMessageByIdParamsIdDTO,
    @Body() body: RequestUpdateMessageByIdBodyDTO,
  ): Promise<ResponseUpdateMessageByIdDTO> {
    try {
      const { channelId, chatId, messageId } = params;
      const command = new UpdateMessageByIdCommand(
        String(req.user.oid),
        channelId,
        chatId,
        messageId,
        body.content,
      );
      const message =
        await this.updateMessageByIdCommandHandler.execute(command);
      return {
        id: String(message.oid),
        content: message.content,
        author: {
          id: String(req.user.oid),
          display_name: req.user.displayName,
          username: req.user.credentials.username,
          email: req.user.credentials.email,
          avatar: req.user.avatarUrl ?? null,
          created_at: req.user.createdAt.toISOString(),
          updated_at: req.user.updatedAt.toISOString(),
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
