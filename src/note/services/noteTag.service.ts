import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { NoteTag } from '../entities/noteTags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoteTagService extends TypeOrmCrudService<NoteTag> {
  constructor(@InjectRepository(NoteTag) repo: Repository<NoteTag>) {
    super(repo);
  }
}
