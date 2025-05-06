import {
  Body,
  Controller,
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
  ResponseCreateMessageDTO,
} from '@/application/api/message/schemas.message';
import { CreateMessageCommand } from '@/logic/commands/messages.command';
import { ICreateMessageCommandHandler } from '@/infra/nest-providers/command.providers';

@ApiTags('Messages')
@Controller('/api/channels/{:channelId}/chats/{:chatId}/messages')
export class MessageController {
  constructor(
    @Inject(ICreateMessageCommandHandler)
    protected readonly createMessageCommandHandler: ICreateMessageCommandHandler,
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
        reply_to: message.replyTo ? String(message.replyTo.oid) : null,
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
}
