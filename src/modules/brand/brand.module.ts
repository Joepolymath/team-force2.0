import { Module } from '@nestjs/common';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BusinessUnit } from './entities/business-unit.entity';
import { BusinessUnitService } from './services/businessUnit.service';
import { BusinessUnitController } from './controllers/businessUnit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BusinessUnit])],
  controllers: [BrandController, BusinessUnitController],
  providers: [BrandService, BusinessUnitService],
})
export class BrandModule {}
