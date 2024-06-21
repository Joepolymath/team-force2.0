import { Injectable } from '@nestjs/common';

import { Reminder } from './entities/reminder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class ReminderService extends TypeOrmCrudService<Reminder> {
  constructor(@InjectRepository(Reminder) repo: Repository<Reminder>) {
    super(repo);
  }
}
