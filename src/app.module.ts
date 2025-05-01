import { AuthModule } from '@/application/api/auth/module.auth';
import { UsersModule } from '@/application/api/users/module.users';
import { ConfigSchema } from '@/config/schema';
import { registerTypeOrmModule } from '@/infra/nestjs-typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelsModule } from '@/application/api/channels/module.channels';
import { ChatsModule } from '@/application/api/chats/module.chats';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => ConfigSchema.parse(config),
    }),
    registerTypeOrmModule(),
    AuthModule,
    UsersModule,
    ChannelsModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
