import { AuthController } from '@/application/api/auth/auth.controller';
import {
  CredentialsRepositoryProvider,
  IRegisterCommandHandler,
  NestJsRegisterCommandHandlerProvider,
} from '@/infra/nest-providers/auth-handlers.providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    CredentialsRepositoryProvider,
    NestJsRegisterCommandHandlerProvider,
  ],
  exports: [IRegisterCommandHandler],
})
export class AuthModule {}
