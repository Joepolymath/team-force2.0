import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessUnit } from './business-unit.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => BusinessUnit, (businessUnit) => businessUnit.brand)
  businessUnit: BusinessUnit[];

  @OneToMany(() => User, (user) => user.brand)
  users: User[];
}
