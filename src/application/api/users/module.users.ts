import { Module } from '@nestjs/common';
import { UsersController } from '@/application/api/users/controller.users';
import { ProfileRepositoryProvider } from '@/infra/nest-providers/repository.providers';
import {
  FileServiceProvider,
  JWTServiceProvider,
  JwtStrategyProvider,
} from '@/infra/nest-providers/service.providers';
import { NestJsUpdateCurrentUserCommandHandlerProvider } from '@/infra/nest-providers/command.providers';

@Module({
  controllers: [UsersController],
  providers: [
    ProfileRepositoryProvider,
    JWTServiceProvider,
    JwtStrategyProvider,
    FileServiceProvider,
    NestJsUpdateCurrentUserCommandHandlerProvider,
  ],
})
export class UsersModule {}
