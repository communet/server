import { WsGateway } from '@/application/api/ws/ws.gateway';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WsModule {}
