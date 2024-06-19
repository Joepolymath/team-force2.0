import { Crud, CrudController } from '@nestjsx/crud';
import { NoteTag } from '../entities/noteTags.entity';
import { Controller } from '@nestjs/common';
import { NoteTagService } from '../services/noteTag.service';

@Crud({
  model: {
    type: NoteTag,
  },
})
@Controller('note-tags')
export class NoteTagController implements CrudController<NoteTag> {
  constructor(public service: NoteTagService) {}
}
