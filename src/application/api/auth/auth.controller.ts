import {
  Body,
  Controller,
  Inject,
  Post,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RequestLoginDTO,
  RequestRegisterDTO,
  ResponseLoginDTO,
  ResponseRegisterDTO,
} from '@/application/api/auth/auth.schema';
import { LoginCommand, RegisterCommand } from '@/logic/commands/auth.command';
import {
  ILoginCommandHandler,
  IRegisterCommandHandler,
} from '@/infra/nest-providers/auth.providers';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    @Inject(IRegisterCommandHandler)
    private readonly registerCommandHandler: IRegisterCommandHandler,

    @Inject(ILoginCommandHandler)
    private readonly loginCommandHandler: ILoginCommandHandler,
  ) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Register new user in application',
    type: ResponseRegisterDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ResponseErrorDTO,
  })
  async register(
    @Body() body: RequestRegisterDTO,
  ): Promise<ResponseRegisterDTO> {
    try {
      const command = new RegisterCommand(
        body.username,
        body.email,
        body.password,
      );
      const credentials = await this.registerCommandHandler.execute(command);
      return {
        id: String(credentials.oid),
        username: credentials.username,
        email: credentials.email,
        created_at: credentials.createdAt,
        updated_at: credentials.updatedAt,
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

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Authorization user in application',
    type: ResponseLoginDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
    type: ResponseErrorDTO,
  })
  async login(
    @Body() body: RequestLoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseLoginDTO> {
    try {
      const command = new LoginCommand(
        body.username,
        body.email,
        body.password,
      );
      const authData = await this.loginCommandHandler.execute(command);

      res.cookie('refresh_token', authData.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: authData.refreshExpires * 1000,
        path: '/api/auth',
      });

      return {
        access_token: authData.accessToken,
        access_expires: authData.accessExpires,
      };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
