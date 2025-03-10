import {
  Body,
  Controller,
  Inject,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RequestRegisterDTO,
  ResponseRegisterDTO,
} from '@/application/api/auth/auth.schema';
import { RegisterCommand } from '@/logic/commands/auth.command';
import { IRegisterCommandHandler } from '@/infra/nest-providers/auth-handlers.providers';
import { ApplicationError } from '@/domain/exceptions/base.exceptions';
import { ResponseErrorDTO } from '@/application/api/base.schemas';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    @Inject(IRegisterCommandHandler)
    private readonly registerCommandHandler: IRegisterCommandHandler,
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
}
