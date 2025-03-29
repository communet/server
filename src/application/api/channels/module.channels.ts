import { Module } from '@nestjs/common';
import { ChannelsController } from '@/application/api/channels/controller.channels';

@Module({
  controllers: [ChannelsController],
  providers: [],
})
export class ChannelsModule {}
