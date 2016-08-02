import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/compiler/src/facade/async";

@Component({
  selector: 'note-creator',
  styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  `],
  template: `
    <div class="note-creator shadow-2">
      <form class="row" (submit)="onCreateNote()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          (focus)="toggle(true)"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div 
          class="actions col-xs-12 row between-xs" 
          *ngIf="fullForm"
        >
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div> 
  `
})
export class NoteCreator {
  @Output()
  private createNote:EventEmitter<any> = new EventEmitter();
  private newNote:any = {
    title: '',
    value: ''
  };
  private fullForm:boolean = false;

  onCreateNote():void {
    const {title, value} = this.newNote;

    if (title && value) {
      this.createNote.emit({title, value});
      this.reset();
    }
  }

  private reset():void {
    this.newNote = {
      title: '',
      value: ''
    };
  }

  toggle(value:boolean):void {
    this.fullForm = value;
  }
}
