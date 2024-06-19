import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Brand } from '../entities/brand.entity';
import { BrandService } from '../services/brand.service';

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
