import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, DeepPartial, FindOneOptions } from 'typeorm';

import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private dataSource: DataSource) {}
  private repo = this.dataSource.getRepository(User);

  create(data: DeepPartial<User>): User {
    return this.repo.create(data);
  }

  async findOne(query: FindOneOptions<User>) {
    return await this.repo.findOne(query);
  }

  async createUser(user: User): Promise<void> {
    const { password } = user;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    try {
      await this.repo.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        console.log({ error });
        throw new InternalServerErrorException();
      }
    }
  }
}
