import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat', // Defines a specific namespace for this gateway
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server | undefined;

  afterInit(server: Server): undefined {
    console.log('WebSocket server initialized');
    console.log(server);
  }

  handleConnection(client: Socket): undefined {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): undefined {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { sender: string; text: string },
  ): void {
    this.server!.emit('message', message);
  }
}
