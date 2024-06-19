import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Brand } from './entities/brand.entity';
import { BrandService } from './brand.service';

@Crud({
  model: {
    type: Brand,
  },
})
@Controller('brands')
export class BrandController implements CrudController<Brand> {
  constructor(public service: BrandService) {}
}
