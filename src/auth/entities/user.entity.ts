import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from './user-status.entity';
import { BusinessUnit } from 'src/brand/entities/business-unit.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { UserRoles } from '../enums/userRoles.enum';
import { Note } from 'src/note/entities/note.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Unknown' })
  title: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Index({ unique: true })
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ default: 'agent' })
  role: UserRoles;

  @Column({ nullable: true })
  whatsAppNumber: string;

  @Column({ nullable: true })
  telegramNumber: string;

  @Column()
  city: string;

  @Column()
  createdBy: string;

  @Column()
  enabled: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column()
  gender: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  isTestProfile: boolean;

  @Column({ default: true })
  isTrusted: boolean;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
  status: UserStatus;

  @ManyToOne(() => BusinessUnit, (businessUnit) => businessUnit.users)
  businessUnit: BusinessUnit;

  @ManyToOne(() => Brand, (brand) => brand.users)
  brand: Brand;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
