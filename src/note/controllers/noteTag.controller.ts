import { NoteTag } from '../entities/noteTags.entity';
import { Controller } from '@nestjs/common';
import { NoteTagService } from '../services/noteTag.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: NoteTag,
  },
})
@Controller('note-tags')
export class NoteTagController implements CrudController<NoteTag> {
  constructor(public service: NoteTagService) {}
}
