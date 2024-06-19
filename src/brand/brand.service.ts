import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService extends TypeOrmCrudService<Brand> {
  constructor(@InjectRepository(Brand) repo: Repository<Brand>) {
    super(repo);
  }
}
