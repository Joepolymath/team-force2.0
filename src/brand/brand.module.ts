import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BusinessUnit } from './entities/business-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BusinessUnit])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
