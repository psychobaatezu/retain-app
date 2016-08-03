import {Component} from "@angular/core";
import {NoteCard} from "../ui/note-card";
import {NoteCreator} from "../ui/note-creator";
import {NoteService} from "../services/notes";

@Component({
  selector: 'notes-container',
  directives: [
    NoteCard,
    NoteCreator
  ],
  styles: [`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px;
    }
  `],
  template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        <note-creator (createNote)="onCreateNote($event)"></note-creator>
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
          <note-card 
            class="col-xs-4"
            [note]="note"
            *ngFor="let note of notes; let i = index"
            (checked)="onNoteChecked($event, i)"
          >
          </note-card>
        </div>
      </div>
    </div>
  `
})
export class Notes {
  private notes:any = [];

  constructor(private noteService:NoteService) {
    this.noteService.getNotes()
        .subscribe(res => this.notes = res.data);
  }

  onNoteChecked(note:any, i:number):void {
    this.noteService.completeNote(note)
        .subscribe(note => {
          const i = this.notes.findIndex(localNote => localNote.id === note.id);
          this.notes.splice(i, 1);
        });
  }

  onCreateNote(note:any):void {
    this.noteService.createNote(note)
        .subscribe(note => this.notes.push(note));
  }
}
