import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserStatus } from '../entities/user-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserStatusService extends TypeOrmCrudService<UserStatus> {
  constructor(@InjectRepository(UserStatus) repo: Repository<UserStatus>) {
    super(repo);
  }
}
