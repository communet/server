import { AuthController } from '@/application/api/auth/auth.controller';
import {
  CredentialsRepositoryProvider,
  ILoginCommandHandler,
  IRedisProvider,
  IRegisterCommandHandler,
  JWTServiceProvider,
  NestJsLoginCommandHandlerProvider,
  NestJsRedisProvider,
  NestJsRegisterCommandHandlerProvider,
} from '@/infra/nest-providers/auth.providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    CredentialsRepositoryProvider,
    JWTServiceProvider,
    NestJsRegisterCommandHandlerProvider,
    NestJsLoginCommandHandlerProvider,
    NestJsRedisProvider,
  ],
  exports: [IRegisterCommandHandler, ILoginCommandHandler, IRedisProvider],
})
export class AuthModule {}
