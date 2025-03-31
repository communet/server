import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/application/api/auth/guards.auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import { ICreateChannelCommandHandler } from '@/infra/nest-providers/command.providers';
import { CreateChannelCommand } from '@/logic/commands/channels.command';
import {
  RequestCreateChannelDTO,
  ResponseCreateChannelDTO,
} from '@/application/api/channels/schemas.channels';

@ApiTags('Channels')
@Controller('/api/channels')
export class ChannelsController {
  constructor(
    @Inject(ICreateChannelCommandHandler)
    private readonly createChannelCommandHandler: ICreateChannelCommandHandler,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async updateCurrentUser(
    @Body() body: RequestCreateChannelDTO,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<ResponseCreateChannelDTO> {
    try {
      const avatarBuffer: Buffer | undefined = avatar?.buffer;
      const avatarFileName: string | undefined = avatar?.originalname;

      const command = new CreateChannelCommand(
        body.name,
        body.description ?? undefined,
        avatarBuffer,
        avatarFileName,
      );
      const channel = await this.createChannelCommandHandler.execute(command);

      return {
        id: String(channel.oid),
        name: channel.name,
        description: channel.description ?? null,
        avatar: channel.avatarUrl ?? null,
        created_at: channel.createdAt.toISOString(),
        updated_at: channel.updatedAt.toISOString(),
      };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
