import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReminderStatus } from '../enums/reminder.enum';
import { User } from 'src/auth/entities/user.entity';

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: ReminderStatus.PENDING })
  status: ReminderStatus;

  @Column({ type: 'text' })
  text: string;

  @Column()
  remindDate: Date;

  @ManyToOne(() => User, (user) => user.reminders)
  user: User;

  @Column({ default: false })
  isDispatched: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
