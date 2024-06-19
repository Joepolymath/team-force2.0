import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Reminder } from './entities/reminder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReminderService extends TypeOrmCrudService<Reminder> {
  constructor(@InjectRepository(Reminder) repo: Repository<Reminder>) {
    super(repo);
  }
}
