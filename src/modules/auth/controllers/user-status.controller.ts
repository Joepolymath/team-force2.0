import { UserStatus } from '../entities/user-status.entity';
import { Controller } from '@nestjs/common';
import { UserStatusService } from '../services/user-status.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: UserStatus,
  },
})
@Controller('statuses')
export class UserStatusController implements CrudController<UserStatus> {
  constructor(public service: UserStatusService) {}
}
