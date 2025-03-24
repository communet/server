import { AuthController } from '@/application/api/auth/controller.auth';
import {
  NestJsLoginCommandHandlerProvider,
  NestJsRefreshCommandHandlerProvider,
  NestJsRegisterCommandHandlerProvider,
} from '@/infra/nest-providers/command.providers';
import {
  CredentialsRepositoryProvider,
  ProfileRepositoryProvider,
  TransactionManagerProvider,
} from '@/infra/nest-providers/repository.providers';
import {
  JWTServiceProvider,
  JwtStrategyProvider,
  NestJsRedisProvider,
} from '@/infra/nest-providers/service.providers';
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
