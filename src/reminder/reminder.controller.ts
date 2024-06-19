import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Reminder } from './entities/reminder.entity';
import { ReminderService } from './reminder.service';

@Crud({
  model: {
    type: Reminder,
  },
  query: {
    join: {
      user: {
        eager: true,
        allow: ['firstName', 'lastName', 'email'],
      },
    },
  },
})
@Controller('reminders')
export class ReminderController implements CrudController<Reminder> {
  constructor(public service: ReminderService) {}
}
