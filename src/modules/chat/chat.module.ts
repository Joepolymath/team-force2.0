import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { AuthService } from '../auth/services/auth.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatus } from '../auth/entities/user-status.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../auth/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require('cache-manager-redis-store').redisStore;

@Module({
  providers: [ChatGateway, AuthService, JwtService, ChatGateway],
  imports: [
    AuthModule,
    JwtModule,
    TypeOrmModule.forFeature([UserStatus, User]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost', // Redis server host
      port: 6379, // Redis server port
      ttl: 5000, // Cache expiration time
      max: 10, // Maximum number of items in cache
    }),
  ],
  exports: [ChatGateway],
})
export class ChatModule {}
