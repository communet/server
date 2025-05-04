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
  IConnectToChannelCommandHandler,
  ICreateChannelCommandHandler,
  IDeleteChannelCommandHandler,
  IDisconnectFromChannelCommandHandler,
  IUpdateChannelCommandHandler,
} from '@/infra/nest-providers/command.providers';
import {
  CreateChannelCommand,
  DeleteChannelCommand,
  UpdateChannelCommand,
} from '@/logic/commands/channels.command';
import {
  RequestConnectToChannelParamsDTO,
  RequestCreateChannelDTO,
  RequestDeleteChannelParamsDTO,
  RequestDisconnectFromChannelParamsDTO,
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
import {
  ConnectToChannelCommand,
  DisconnectFromChannelCommand,
} from '@/logic/commands/members.command';

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

    @Inject(IConnectToChannelCommandHandler)
    private readonly connectToChannelCommandHandler: IConnectToChannelCommandHandler,

    @Inject(IDisconnectFromChannelCommandHandler)
    private readonly disconnectFromChannelCommandHandler: IDisconnectFromChannelCommandHandler,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get all channels',
    type: ResponseGetChannelsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async getChannels(
    @Req() req: RequestWithUser,
  ): Promise<ResponseGetChannelsDTO> {
    try {
      const query = new GetChannelsQuery(String(req.user.oid));
      const channels = await this.getChannelsQueryHandler.execute(query);
      return channels.map((channel) => ({
        id: String(channel.oid),
        name: channel.name,
        description: channel.description ?? null,
        avatar: channel.avatarUrl ?? null,
        members: channel.members.map((member) => ({
          id: String(member.oid),
          display_name: member.displayName,
          username: member.credentials.username,
          email: member.credentials.email,
          avatar: member.avatarUrl,
          created_at: member.createdAt.toISOString(),
          updated_at: member.updatedAt.toISOString(),
        })),
        is_deleted: channel.isDeleted,
        created_at: channel.createdAt.toISOString(),
        updated_at: channel.updatedAt.toISOString(),
      }));
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

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name'],
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
  @ApiResponse({
    status: 201,
    description: 'Create new channel',
    type: ResponseCreateChannelDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async createChannel(
    @Req() req: RequestWithUser,
    @Body() body: RequestCreateChannelDTO,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<ResponseCreateChannelDTO> {
    try {
      const avatarBuffer: Buffer | undefined = avatar?.buffer;
      const avatarFileName: string | undefined = avatar?.originalname;

      const command = new CreateChannelCommand(
        String(req.user.oid),
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
    type: ResponseGetChannelByIdDTO,
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
        members: channel.members.map((profile) => ({
          id: String(profile.oid),
          display_name: profile.displayName,
          username: profile.credentials.username,
          email: profile.credentials.email,
          avatar: profile.avatarUrl,
          created_at: profile.createdAt.toISOString(),
          updated_at: profile.updatedAt.toISOString(),
        })),
        is_deleted: channel.isDeleted,
        created_at: channel.createdAt.toISOString(),
        updated_at: channel.updatedAt.toISOString(),
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

  @Delete('/:channelId')
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
    @Req() req: RequestWithUser,
    @Param() params: RequestDeleteChannelParamsDTO,
  ): Promise<undefined> {
    try {
      const { channelId } = params;
      const command = new DeleteChannelCommand(String(req.user.oid), channelId);
      await this.deleteChannelCommandHandler.execute(command);
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

  @Patch('/:channelId')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name'],
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
  @ApiResponse({
    status: 200,
    description: 'Update channel by id',
    type: ResponseUpdateChannelDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async updateChannelById(
    @Req() req: RequestWithUser,
    @Param() params: RequestUpdateChannelParamsDTO,
    @Body() body: RequestUpdateChannelDTO,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<ResponseUpdateChannelDTO> {
    try {
      const { channelId } = params;
      const avatarBuffer: Buffer | undefined = avatar?.buffer;
      const avatarFileName: string | undefined = avatar?.originalname;

      const command = new UpdateChannelCommand(
        String(req.user.oid),
        channelId,
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

  @Post('/:channelId/join')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Connect to channel',
  })
  @ApiResponse({
    status: 409,
    description: 'User already joined to channel',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async connectToChannel(
    @Req() req: RequestWithUser,
    @Param() params: RequestConnectToChannelParamsDTO,
  ): Promise<undefined> {
    try {
      const { channelId } = params;
      const command = new ConnectToChannelCommand(
        String(req.user.oid),
        channelId,
      );
      await this.connectToChannelCommandHandler.execute(command);
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/:channelId/disconnect')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Disconnect from channel',
  })
  @ApiResponse({
    status: 409,
    description: 'User already disconnected from channel',
    type: ResponseErrorDTO,
  })
  @UseGuards(JwtAuthGuard)
  async disconnectFromChannel(
    @Req() req: RequestWithUser,
    @Param() params: RequestDisconnectFromChannelParamsDTO,
  ): Promise<undefined> {
    try {
      const { channelId } = params;
      const command = new DisconnectFromChannelCommand(
        String(req.user.oid),
        channelId,
      );
      await this.disconnectFromChannelCommandHandler.execute(command);
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
