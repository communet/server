import { Message } from '@/domain/entities/message.entities';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WsGateway {
  @WebSocketServer()
  server!: Server;

  sendMessageToChannelExcludeSender(
    channelId: string,
    message: Message,
    excludeSocketId: string,
  ): undefined {
    this.server
      .to(channelId)
      .except(excludeSocketId)
      .emit('message', message);
  }
}
