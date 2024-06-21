import { Injectable } from '@nestjs/common';

import { NoteTag } from '../entities/noteTags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class NoteTagService extends TypeOrmCrudService<NoteTag> {
  constructor(@InjectRepository(NoteTag) repo: Repository<NoteTag>) {
    super(repo);
  }
}
