import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { UserStatus } from './entities/user-status.entity';
import { UserStatusService } from './services/user-status.service';
import { UserStatusController } from './controllers/user-status.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository, Brand, UserStatus]),
  ],
  providers: [AuthService, JwtStrategy, UserStatusService, UsersRepository],
  controllers: [AuthController, UserStatusController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
