import { Module } from '@nestjs/common';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';
import { NoteTagController } from './controllers/noteTag.controller';
import { NoteTagService } from './services/noteTag.service';

@Module({
  controllers: [NoteController, NoteTagController],
  providers: [NoteService, NoteTagService],
})
export class NoteModule {}
