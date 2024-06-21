import { BusinessUnit } from '../entities/business-unit.entity';
import { Controller } from '@nestjs/common';
import { BusinessUnitService } from '../services/businessUnit.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: BusinessUnit,
  },
  query: {
    join: {
      brand: {
        eager: false,
      },
    },
  },
})
@Controller('business-units')
export class BusinessUnitController implements CrudController<BusinessUnit> {
  constructor(public service: BusinessUnitService) {}
}
