import { User } from 'src/modules/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NoteTag } from './noteTags.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column()
  priority: number;

  @Column({ default: false })
  isSummary: boolean;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @ManyToMany(() => NoteTag, (noteTag) => noteTag.notes)
  @JoinTable({
    name: 'notes_tags',
  })
  tags: NoteTag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
