import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BusinessUnit } from '../entities/business-unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessUnitService extends TypeOrmCrudService<BusinessUnit> {
  constructor(@InjectRepository(BusinessUnit) repo: Repository<BusinessUnit>) {
    super(repo);
  }
}
