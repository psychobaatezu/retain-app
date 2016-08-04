import {Component} from "@angular/core";
import {NoteCard} from "../ui/note-card";
import {NoteCreator} from "../ui/note-creator";
import {NoteService} from "../services/notes";
import {Store} from "../store";

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

  constructor(private noteService: NoteService, private store: Store) {
    this.store.changes.pluck('notes')
        .subscribe((notes: any) => this.notes = notes);

    this.noteService.getNotes()
        .subscribe();
  }

  onNoteChecked(note:any, i:number):void {
    this.noteService.completeNote(note)
        .subscribe();
  }

  onCreateNote(note:any):void {
    this.noteService.createNote(note)
        .subscribe();
  }
}
