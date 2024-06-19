import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('status')
export class UserStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @OneToMany(() => User, (user) => user.status)
  users: User[];
}
