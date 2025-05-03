import { Module } from '@nestjs/common';
import { ChatGateway } from '@/application/api/message/ws.message';

@Module({
  providers: [ChatGateway],
})
export class MessageModule {}
