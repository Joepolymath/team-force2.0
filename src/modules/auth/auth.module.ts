import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { UserStatus } from './entities/user-status.entity';
import { UserStatusService } from './services/user-status.service';
import { UserStatusController } from './controllers/user-status.controller';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 60 * 60 * 24,
        },
      }),
    }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'defaultSecret', // Ensure you have a secret key
    //   signOptions: { expiresIn: '60m' },
    // }),
    TypeOrmModule.forFeature([UsersRepository, Brand, UserStatus]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserStatusService,
    UsersRepository,
    JwtService,
  ],
  controllers: [AuthController, UserStatusController],
  exports: [JwtStrategy, PassportModule, UsersRepository, AuthService],
})
export class AuthModule {}
