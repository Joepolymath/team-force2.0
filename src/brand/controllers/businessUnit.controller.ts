import { Crud, CrudController } from '@nestjsx/crud';
import { BusinessUnit } from '../entities/business-unit.entity';
import { Controller } from '@nestjs/common';
import { BusinessUnitService } from '../services/businessUnit.service';

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
