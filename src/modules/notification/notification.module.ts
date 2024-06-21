import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './providers/email.provider';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, ConfigService, EmailService],
  exports: [EmailService],
})
export class NotificationModule {}
