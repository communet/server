import { Message } from '@/domain/entities/message.entities';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WsGateway implements OnGatewayConnection<unknown> {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: unknown, ...args: unknown[]): void {
    console.log('client connected', client);
    console.log('args', args);
  }

  sendMessageToChannelExcludeSender(
    channelId: string,
    message: Message,
    excludeSocketId: string,
  ): void {
    this.server
      // .to(channelId)
      .except(excludeSocketId)
      .emit('message', message);
  }
}
