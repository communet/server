import {
  ProfileRepositoryProvider,
  JWTServiceProvider,
  JwtStrategyProvider,
} from '@/infra/nest-providers/auth.providers';
import { Module } from '@nestjs/common';
import { UsersController } from '@/application/api/users/controller.users';

@Module({
  controllers: [UsersController],
  providers: [
    ProfileRepositoryProvider,
    JWTServiceProvider,
    JwtStrategyProvider,
  ],
})
export class UsersModule {}
