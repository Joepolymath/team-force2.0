/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/services/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
  path: '/ws',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService) {}

  private logger = new Logger(ChatGateway.name);

  // This keeps track of all the clients the user(s) is(are) connected on
  private connectedUsers: {
    [key: string]: string[];
  } = {};

  afterInit(_server: Server) {
    //  console.log({ server });
    this.logger.log('Initialized websocket connection');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const connectionId = client.id;
    const token = client.handshake.auth.token;

    if (!token) {
      this.logger.warn('Client has no token');
      client.disconnect();
      return;
    }

    console.log({ token });

    const userId = this.authService.verifyToken(token).id;
    if (!userId) {
      this.logger.warn('Invalid Auth Token');
      client.disconnect();
    }
    console.log({ userId });

    this.cacheUser(userId, connectionId);
    this.logger.log(`Client connected: `, {
      connectedUsers: this.connectedUsers,
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.logger.log({ message });
    this.server.emit('message', message);
  }

  private cacheUser(userId: string, clientId: string) {
    if (this.connectedUsers[userId]) {
      this.connectedUsers[userId].push(clientId);
    } else {
      this.connectedUsers[userId] = [clientId];
    }
  }
}
