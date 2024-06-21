import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { AuthService } from '../auth/services/auth.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatus } from '../auth/entities/user-status.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../auth/entities/user.entity';

@Module({
  providers: [ChatGateway, AuthService, JwtService],
  imports: [
    AuthModule,
    JwtModule,
    TypeOrmModule.forFeature([UserStatus, User]),
  ],
  exports: [ChatGateway],
})
export class ChatModule {}
