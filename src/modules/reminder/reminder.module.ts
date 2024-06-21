import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';

@Module({
  controllers: [ReminderController],
  providers: [ReminderService],
  imports: [TypeOrmModule.forFeature([Reminder])],
})
export class ReminderModule {}
