import {
  Body,
  Controller,
  Inject,
  Post,
  HttpException,
  HttpStatus,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RequestLoginDTO,
  RequestRegisterDTO,
  ResponseLoginDTO,
  ResponseRefreshDTO,
  ResponseRegisterDTO,
} from '@/application/api/auth/schema.auth';
import {
  LoginCommand,
  RefreshCommand,
  RegisterCommand,
} from '@/logic/commands/auth.command';
import {
  ILoginCommandHandler,
  IRefreshCommandHandler,
  IRegisterCommandHandler,
} from '@/infra/nest-providers/auth.providers';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import { ResponseErrorDTO } from '@/application/api/base.schemas';
import { Response, Request } from 'express';
import { InvalidCredentialsError } from '@/logic/exceptions/auth.exceptions';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    @Inject(IRegisterCommandHandler)
    private readonly registerCommandHandler: IRegisterCommandHandler,

    @Inject(ILoginCommandHandler)
    private readonly loginCommandHandler: ILoginCommandHandler,

    @Inject(IRefreshCommandHandler)
    private readonly refreshCommandHandler: IRefreshCommandHandler,
  ) {}

  @Post('/register')
  @HttpCode(201)
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
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseRegisterDTO> {
    try {
      const registerCommand = new RegisterCommand(
        body.username,
        body.email,
        body.password,
      );
      await this.registerCommandHandler.execute(registerCommand);

      const loginCommand = new LoginCommand(
        body.username,
        body.email,
        body.password,
      );
      const authData = await this.loginCommandHandler.execute(loginCommand);

      res.cookie('refresh_token', authData.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: authData.refreshExpires * 1000,
        path: '/',
        domain: 'localhost',
      });

      return {
        access_token: authData.accessToken,
        access_expires: authData.accessExpires.toISOString(),
      };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      } else if (error instanceof ApplicationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  @HttpCode(200)
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
        sameSite: 'none',
        maxAge: authData.refreshExpires * 1000,
        path: '/',
        domain: 'localhost',
      });

      return {
        access_token: authData.accessToken,
        access_expires: authData.accessExpires.toISOString(),
      };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/refresh')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Refresh auth tokens by refresh token from cookies',
    type: ResponseRefreshDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Some error with refresh token',
    type: ResponseErrorDTO,
  })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseRefreshDTO> {
    try {
      const token = (req.cookies as Record<string, string>)['refresh_token'];
      if (!token) {
        throw new ApplicationError(
          'EmptyRefreshToken ',
          'Refresh token is empty',
        );
      }

      const command = new RefreshCommand(token);
      const newAuthData = await this.refreshCommandHandler.execute(command);

      res.cookie('refresh_token', newAuthData.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: newAuthData.refreshExpires * 1000,
        path: '/',
        domain: 'localhost',
      });

      return {
        access_token: newAuthData.accessToken,
        access_expires: newAuthData.accessExpires.toISOString(),
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
