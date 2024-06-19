import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';

@Entity('note-tags')
export class NoteTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}
