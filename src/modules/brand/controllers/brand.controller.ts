import { Controller } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { BrandService } from '../services/brand.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: Brand,
  },
  query: {
    // allow: ['name'],
    // exclude: ['name'],
  },
})
@Controller('brands')
export class BrandController implements CrudController<Brand> {
  constructor(public service: BrandService) {}
}
