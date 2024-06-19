import { Crud, CrudController } from '@nestjsx/crud';
import { UserStatus } from '../entities/user-status.entity';
import { Controller } from '@nestjs/common';
import { UserStatusService } from '../services/user-status.service';

@Crud({
  model: {
    type: UserStatus,
  },
})
@Controller('statuses')
export class UserStatusController implements CrudController<UserStatus> {
  constructor(public service: UserStatusService) {}
}
