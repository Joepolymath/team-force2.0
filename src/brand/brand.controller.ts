import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Brand } from './entities/brand.entity';

@Crud({
  model: {
    type: Brand,
  },
})
@Controller('brands')
export class BrandController {}
