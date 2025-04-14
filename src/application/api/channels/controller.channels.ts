import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  RequestWithUser,
} from '@/application/api/auth/guards.auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import {
  ICreateChannelCommandHandler,
  IDeleteChannelCommandHandler,
  IUpdateChannelCommandHandler,
} from '@/infra/nest-providers/command.providers';
import {
  CreateChannelCommand,
  DeleteChannelCommand,
  UpdateChannelCommand,
} from '@/logic/commands/channels.command';
import {
  RequestCreateChannelDTO,
  RequestDeleteChannelParamsDTO,
  RequestGetChannelByIdDTO,
  RequestUpdateChannelDTO,
  RequestUpdateChannelParamsDTO,
  ResponseCreateChannelDTO,
  ResponseGetChannelByIdDTO,
  ResponseGetChannelsDTO,
  ResponseUpdateChannelDTO,
} from '@/application/api/channels/schemas.channels';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import {
  GetChannelByIdQuery,
  GetChannelsQuery,
} from '@/logic/queries/channels.queries';
import {
  IGetChannelByIdQueryHandler,
  IGetChannelsQueryHandler,
} from '@/infra/nest-providers/query.providers';

@ApiTags('Channels')
@Controller('/api/channels')
export class ChannelsController {
  constructor(
    @Inject(ICreateChannelCommandHandler)
    private readonly createChannelCommandHandler: ICreateChannelCommandHandler,

    @Inject(IUpdateChannelCommandHandler)
    private readonly updateChannelCommandHandler: IUpdateChannelCommandHandler,

    @Inject(IDeleteChannelCommandHandler)
    private readonly deleteChannelCommandHandler: IDeleteChannelCommandHandler,

    @Inject(IGetChannelByIdQueryHandler)
    private readonly getChannelByIdQueryHandler: IGetChannelByIdQueryHandler,

    @Inject(IGetChannelsQueryHandler)
    private readonly getChannelsQueryHandler: IGetChannelsQueryHandler,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get all channels',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async getChannels(
    @Req() req: RequestWithUser,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<ResponseGetChannelsDTO> {
    try {
      const query = new GetChannelsQuery(limit, offset, req.user);
      const [channels, count] =
        await this.getChannelsQueryHandler.execute(query);
      return {
        channels: channels.map((channel) => ({
          id: String(channel.oid),
          name: channel.name,
          description: channel.description ?? null,
          avatar: channel.avatarUrl ?? null,
          is_deleted: channel.isDeleted,
          created_at: channel.createdAt.toISOString(),
          updated_at: channel.updatedAt.toISOString(),
        })),
        count: count,
        limit: limit,
        offset: offset,
      };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
  async createChannel(
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
        is_deleted: channel.isDeleted,
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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get channel by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async getChannelById(
    @Param() params: RequestGetChannelByIdDTO,
  ): Promise<ResponseGetChannelByIdDTO> {
    try {
      const { id } = params;
      const query = new GetChannelByIdQuery(id);
      const channel = await this.getChannelByIdQueryHandler.execute(query);
      return {
        id: String(channel.oid),
        name: channel.name,
        description: channel.description,
        avatar: channel.avatarUrl,
        is_deleted: channel.isDeleted,
        created_at: channel.createdAt.toISOString(),
        updated_at: channel.updatedAt.toISOString(),
      };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Delete channel by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async deleteChannelById(
    @Param() params: RequestDeleteChannelParamsDTO,
  ): Promise<undefined> {
    try {
      const { id } = params;
      const command = new DeleteChannelCommand(id);
      await this.deleteChannelCommandHandler.execute(command);
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/:id')
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
  async updateChannelById(
    @Param() params: RequestUpdateChannelParamsDTO,
    @Body() body: RequestUpdateChannelDTO,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<ResponseUpdateChannelDTO> {
    try {
      const { id } = params;
      const avatarBuffer: Buffer | undefined = avatar?.buffer;
      const avatarFileName: string | undefined = avatar?.originalname;

      const command = new UpdateChannelCommand(
        id,
        body.name ?? undefined,
        body.description ?? undefined,
        avatarBuffer,
        avatarFileName,
      );
      const channel = await this.updateChannelCommandHandler.execute(command);

      return {
        id: String(channel.oid),
        name: channel.name,
        description: channel.description ?? null,
        avatar: channel.avatarUrl ?? null,
        is_deleted: channel.isDeleted,
        created_at: channel.createdAt.toISOString(),
        updated_at: channel.updatedAt.toISOString(),
      };
    } catch (error) {
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
