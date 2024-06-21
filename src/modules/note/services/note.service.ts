import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Note } from '../entities/note.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class NoteService extends TypeOrmCrudService<Note> {
  constructor(@InjectRepository(Note) repo: Repository<Note>) {
    super(repo);
  }
}
