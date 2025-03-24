import {
  Controller,
  HttpException,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import {
  JwtAuthGuard,
  RequestWithUser,
} from '@/application/api/auth/guards.auth';
import { ReponseGetCurrentUserDTO } from '@/application/api/users/schemas.users';

@ApiTags('Users')
@Controller('/api/users')
export class UsersController {
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
}
