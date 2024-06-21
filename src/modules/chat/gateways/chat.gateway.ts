/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
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
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { ConnectionData } from '../enums/caches.enum';

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

  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private logger = new Logger(ChatGateway.name);

  // This keeps track of all the clients the user(s) is(are) connected on
  // TODO: Handle with redis
  private connectedUsers: {
    [key: string]: string[];
  } = {};

  afterInit(_server: Server) {
    //  console.log({ server });
    this.logger.log('Initialized websocket connection');
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
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

    await this.cacheUser(userId, connectionId);
    this.logger.log(`Client connected: `, {
      connectedUsers: this.connectedUsers,
    });
  }

  async handleDisconnect(client: Socket) {
    try {
      const connectionId = client.id;
      const cachedConnectedIds = JSON.parse(
        await this.cacheManager.get(ConnectionData.CONNECTED_IDS),
      );
      const userId = cachedConnectedIds[connectionId];
      const connectedUsers = JSON.parse(
        await this.cacheManager.get(ConnectionData.CONNECTED_USERS),
      );
      connectedUsers[userId] = connectedUsers[userId].filter(
        (clientId: string) => clientId !== connectionId,
      );
      await this.cacheManager.set(
        ConnectionData.CONNECTED_USERS,
        JSON.stringify(connectedUsers),
      );

      delete cachedConnectedIds[connectionId];
      await this.cacheManager.set(
        ConnectionData.CONNECTED_IDS,
        JSON.stringify(cachedConnectedIds),
      );

      this.logger.log(`Client disconnected: ${client.id}`);
    } catch (error) {
      this.logger.log(
        `Client disconnected with error: ${client.id}. Error:`,
        error,
      );
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.logger.log({ message });
    this.server.emit('message', message);
  }

  private async cacheUser(userId: string, clientId: string) {
    let cachedUsers = JSON.parse(
      await this.cacheManager.get(ConnectionData.CONNECTED_USERS),
    );
    console.log({ cachedUsers });
    if (!cachedUsers) {
      this.connectedUsers[userId] = [clientId];
      cachedUsers = this.connectedUsers;
      const newCache = await this.cacheManager.set(
        ConnectionData.CONNECTED_USERS,
        JSON.stringify(this.connectedUsers),
      );
      console.log({ newCache });
      // return;
    }

    if (cachedUsers[userId] && !cachedUsers[userId].includes(clientId)) {
      cachedUsers[userId].push(clientId);
    } else {
      cachedUsers[userId] = [clientId];
    }

    await this.cacheManager.set(
      ConnectionData.CONNECTED_USERS,
      JSON.stringify(cachedUsers),
    );

    let cachedConnectedIds = await JSON.parse(
      await this.cacheManager.get(ConnectionData.CONNECTED_IDS),
    );
    // let localConnectedIds: {
    //   [key: string]: string
    // }

    if (!cachedConnectedIds) {
      cachedConnectedIds = {
        [clientId]: userId,
      };
    } else {
      cachedConnectedIds[clientId] = userId;
    }

    console.log({ cachedConnectedIds });

    const connectedIds = await this.cacheManager.set(
      ConnectionData.CONNECTED_IDS,
      JSON.stringify(cachedConnectedIds),
    );
    console.log({ connectedIds });
  }
}
