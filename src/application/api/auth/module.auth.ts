import { AuthController } from '@/application/api/auth/controller.auth';
import {
  CredentialsRepositoryProvider,
  JWTServiceProvider,
  NestJsLoginCommandHandlerProvider,
  NestJsRedisProvider,
  NestJsRefreshCommandHandlerProvider,
  NestJsRegisterCommandHandlerProvider,
  ProfileRepositoryProvider,
  TransactionManagerProvider,
  JwtStrategyProvider,
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
    JwtStrategyProvider,
  ],
})
export class AuthModule {}
