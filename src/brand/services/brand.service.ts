import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class BrandService extends TypeOrmCrudService<Brand> {
  constructor(@InjectRepository(Brand) repo: Repository<Brand>) {
    super(repo);
  }
}
