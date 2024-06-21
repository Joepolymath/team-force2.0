import { Controller } from '@nestjs/common';
// import { Crud, CrudController } from '@nestjsx/crud';
import { Note } from '../entities/note.entity';
import { NoteService } from '../services/note.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: Note,
  },
  query: {
    join: {
      tags: {
        eager: false,
      },
      user: {
        eager: false,
      },
    },
  },
})
@Controller('notes')
export class NoteController implements CrudController<Note> {
  constructor(public service: NoteService) {}
}
