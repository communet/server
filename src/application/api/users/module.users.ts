import { Module } from '@nestjs/common';
import { UsersController } from '@/application/api/users/controller.users';
import { ProfileRepositoryProvider } from '@/infra/nest-providers/repository.providers';
import {
  JWTServiceProvider,
  JwtStrategyProvider,
} from '@/infra/nest-providers/service.providers';

@Module({
  controllers: [UsersController],
  providers: [
    ProfileRepositoryProvider,
    JWTServiceProvider,
    JwtStrategyProvider,
  ],
})
export class UsersModule {}
