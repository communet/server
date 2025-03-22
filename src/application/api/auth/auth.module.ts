import { AuthController } from '@/application/api/auth/auth.controller';
import {
  CredentialsRepositoryProvider,
  JWTServiceProvider,
  NestJsLoginCommandHandlerProvider,
  NestJsRedisProvider,
  NestJsRefreshCommandHandlerProvider,
  NestJsRegisterCommandHandlerProvider,
  ProfileRepositoryProvider,
  TransactionManagerProvider,
} from '@/infra/nest-providers/auth.providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    CredentialsRepositoryProvider,
    ProfileRepositoryProvider,
    JWTServiceProvider,
    TransactionManagerProvider,
    NestJsRedisProvider,
    NestJsRegisterCommandHandlerProvider,
    NestJsLoginCommandHandlerProvider,
    NestJsRefreshCommandHandlerProvider,
  ],
})
export class AuthModule {}
