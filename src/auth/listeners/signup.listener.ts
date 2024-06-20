import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SignUpEvent } from 'src/auth/events/signup.events';

@Injectable()
export class NoteCreatedListener {
  @OnEvent('note.created')
  handleNoteCreatedEvent(event: SignUpEvent) {
    //  console.log(`Note created with ID: ${event.noteId} for user: ${event.userId}`);
    // Add your logic here (e.g., sending an email notification)
  }
}
