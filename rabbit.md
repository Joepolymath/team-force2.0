To handle offline messaging in your enterprise chat app using NestJS, Socket.IO, and RabbitMQ, you can follow these steps:

1. **Set Up RabbitMQ**: Ensure RabbitMQ is set up and running. You will need to define a queue to store messages for offline users.

2. **Install Required Packages**: Install the necessary packages for RabbitMQ and Socket.IO integration in your NestJS project.

   ```bash
   npm install @nestjs/websockets @nestjs/platform-socket.io socket.io @nestjs/microservices amqplib
   ```

3. **Configure RabbitMQ in NestJS**:
   Create a RabbitMQ service to handle message queueing.

   ```typescript
   // rabbitmq.service.ts
   import { Injectable } from '@nestjs/common';
   import * as amqplib from 'amqplib';

   @Injectable()
   export class RabbitMQService {
     private channel: amqplib.Channel;

     async connect() {
       const connection = await amqplib.connect('amqp://localhost');
       this.channel = await connection.createChannel();
       await this.channel.assertQueue('offline_messages', { durable: true });
     }

     async sendMessage(queue: string, message: any) {
       this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
         persistent: true,
       });
     }

     async receiveMessages(queue: string, callback: (msg) => void) {
       this.channel.consume(queue, (msg) => {
         if (msg !== null) {
           callback(JSON.parse(msg.content.toString()));
           this.channel.ack(msg);
         }
       });
     }
   }
   ```

4. **Integrate RabbitMQ with WebSocket Gateway**:
   Modify your WebSocket gateway to handle user connections and message queueing.

   ```typescript
   // chat.gateway.ts
   import {
     WebSocketGateway,
     WebSocketServer,
     SubscribeMessage,
     OnGatewayConnection,
     OnGatewayDisconnect,
   } from '@nestjs/websockets';
   import { Server, Socket } from 'socket.io';
   import { RabbitMQService } from './rabbitmq.service';

   @WebSocketGateway()
   export class ChatGateway
     implements OnGatewayConnection, OnGatewayDisconnect
   {
     @WebSocketServer() server: Server;
     private onlineUsers: Map<string, string> = new Map(); // userId -> socketId

     constructor(private readonly rabbitMQService: RabbitMQService) {}

     async handleConnection(client: Socket) {
       const userId = client.handshake.query.userId;
       this.onlineUsers.set(userId, client.id);

       // Check for offline messages
       await this.rabbitMQService.receiveMessages(
         'offline_messages',
         (message) => {
           if (message.recipientId === userId) {
             this.server.to(client.id).emit('message', message);
           }
         },
       );
     }

     async handleDisconnect(client: Socket) {
       const userId = Array.from(this.onlineUsers.keys()).find(
         (key) => this.onlineUsers.get(key) === client.id,
       );
       if (userId) {
         this.onlineUsers.delete(userId);
       }
     }

     @SubscribeMessage('sendMessage')
     async handleMessage(
       client: Socket,
       payload: { recipientId: string; message: string },
     ) {
       const recipientSocketId = this.onlineUsers.get(payload.recipientId);
       if (recipientSocketId) {
         // Recipient is online, send message directly
         this.server.to(recipientSocketId).emit('message', payload);
       } else {
         // Recipient is offline, queue the message
         await this.rabbitMQService.sendMessage('offline_messages', payload);
       }
     }
   }
   ```

5. **Initialize RabbitMQ Connection**:
   Ensure the RabbitMQ connection is established when the application starts.

   ```typescript
   // app.module.ts
   import { Module } from '@nestjs/common';
   import { ChatGateway } from './chat.gateway';
   import { RabbitMQService } from './rabbitmq.service';

   @Module({
     providers: [ChatGateway, RabbitMQService],
   })
   export class AppModule {
     constructor(private readonly rabbitMQService: RabbitMQService) {
       this.rabbitMQService.connect();
     }
   }
   ```

With this setup:

- When a user connects to the WebSocket server, their userId and socketId are stored in a `Map`.
- If a user sends a message to an offline recipient, the message is queued in RabbitMQ.
- When an offline user comes online, the server checks for any queued messages and delivers them.

This approach ensures that messages are not lost and are delivered to users when they come online.
