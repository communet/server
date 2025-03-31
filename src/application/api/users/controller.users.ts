import {
  Controller,
  HttpException,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
  Get,
  Patch,
  Inject,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import {
  JwtAuthGuard,
  RequestWithUser,
} from '@/application/api/auth/guards.auth';
import {
  ReponseGetCurrentUserDTO,
  ReponseUpdateCurrentUserDTO,
} from '@/application/api/users/schemas.users';
import { UpdateCurrentUserCommand } from '@/logic/commands/users.command';
import { IUpdateCurrentUserCommandHandler } from '@/infra/nest-providers/command.providers';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('Users')
@Controller('/api/users')
export class UsersController {
  constructor(
    @Inject(IUpdateCurrentUserCommandHandler)
    private readonly updateCurrentUserCommandHandler: IUpdateCurrentUserCommandHandler,
  ) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get data about current user',
    type: ReponseGetCurrentUserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  getCurrentUser(@Req() req: RequestWithUser): ReponseGetCurrentUserDTO {
    try {
      const currentUser = req.user;
      return {
        id: String(currentUser.oid),
        display_name: currentUser.displayName,
        username: currentUser.credentials.username,
        email: currentUser.credentials.email,
        avatar: currentUser.avatarUrl ?? null,
        updated_at: currentUser.updatedAt.toISOString(),
        created_at: currentUser.createdAt.toISOString(),
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

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        display_name: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async updateCurrentUser(
    @Req() req: RequestWithUser,
    @Body() body: { display_name: string | undefined },
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<ReponseUpdateCurrentUserDTO> {
    try {
      const avatarBuffer: Buffer | undefined = avatar?.buffer;
      const avatarFileName: string | undefined = avatar?.originalname;

      const command = new UpdateCurrentUserCommand(
        req.user,
        body.display_name,
        avatarBuffer,
        avatarFileName,
      );
      const updatedProfile =
        await this.updateCurrentUserCommandHandler.execute(command);

      return {
        id: String(updatedProfile.oid),
        display_name: updatedProfile.displayName,
        username: updatedProfile.credentials.username,
        email: updatedProfile.credentials.email,
        avatar: updatedProfile.avatarUrl ?? null,
        created_at: updatedProfile.createdAt.toISOString(),
        updated_at: updatedProfile.updatedAt.toISOString(),
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
