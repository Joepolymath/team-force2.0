import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Note } from '../entities/note.entity';
import { NoteService } from '../services/note.service';

@Crud({
  model: {
    type: Note,
  },
})
@Controller('notes')
export class NoteController implements CrudController<Note> {
  constructor(public service: NoteService) {}
}
