import { Module } from '@nestjs/common';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';
import { NoteTagController } from './controllers/noteTag.controller';
import { NoteTagService } from './services/noteTag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteTag } from './entities/noteTags.entity';

@Module({
  controllers: [NoteController, NoteTagController],
  providers: [NoteService, NoteTagService],
  imports: [TypeOrmModule.forFeature([Note, NoteTag])],
})
export class NoteModule {}
