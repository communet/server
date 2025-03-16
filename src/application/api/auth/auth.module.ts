import { AuthController } from '@/application/api/auth/auth.controller';
import {
  CredentialsRepositoryProvider,
  ILoginCommandHandler,
  IRedisProvider,
  IRefreshCommandHandler,
  IRegisterCommandHandler,
  JWTServiceProvider,
  NestJsLoginCommandHandlerProvider,
  NestJsRedisProvider,
  NestJsRefreshCommandHandlerProvider,
  NestJsRegisterCommandHandlerProvider,
} from '@/infra/nest-providers/auth.providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    CredentialsRepositoryProvider,
    JWTServiceProvider,
    NestJsRedisProvider,
    NestJsRegisterCommandHandlerProvider,
    NestJsLoginCommandHandlerProvider,
    NestJsRefreshCommandHandlerProvider,
  ],
  exports: [
    IRegisterCommandHandler,
    ILoginCommandHandler,
    IRefreshCommandHandler,
    IRedisProvider,
  ],
})
export class AuthModule {}
