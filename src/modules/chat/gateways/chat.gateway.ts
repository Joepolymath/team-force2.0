/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
  path: '/ws',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger(ChatGateway.name);

  afterInit(_server: Server) {
    //  console.log({ server });
    this.logger.log('Initialized websocket connection');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth?.token;
    console.log({ token });
    console.log({ client: client.handshake });
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connection_ack', 'You are connected to the WebSocket server');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.logger.log({ message });
    this.server.emit('message', message);
  }
}
