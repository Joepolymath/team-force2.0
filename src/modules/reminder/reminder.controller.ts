import { Controller } from '@nestjs/common';
import { Reminder } from './entities/reminder.entity';
import { ReminderService } from './reminder.service';
import { Crud, CrudController } from '@dataui/crud';

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
