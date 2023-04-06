import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class ConnectionsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private connections = 0;

  handleConnection(): void {
    this.connections++;
    this.server.emit('subscribers', this.connections);
  }

  handleDisconnect(): void {
    this.connections--;
    this.server.emit('subscribers', this.connections);
  }
}
