import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/compiler/src/facade/async";
import {ColorPicker} from "./color-picker";

@Component({
  selector: 'note-creator',
  directives: [ColorPicker],
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
    <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color}">
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
          <div class="col-xs-3">
            <color-picker 
              [colors]="colors"
              (selected)="onColorSelect($event)"
            >
            </color-picker>
          </div>
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
  colors:Array<string> = ['#b19cd9', '#ff6961', '#77dd77', '#aec6cf', '#f49ac2', '#ffffff'];
  private newNote:any = {
    title: '',
    value: '',
    color: '#ffffff'
  };
  private fullForm:boolean = false;

  onCreateNote():void {
    const {title, value, color} = this.newNote;

    if (title && value) {
      this.createNote.emit({title, value, color});
      this.reset();
    }
  }

  onColorSelect(color:string) {
    this.newNote.color = color;
  }

  private reset():void {
    this.newNote = {
      title: '',
      value: '',
      color: '#ffffff'
    };
  }

  toggle(value:boolean):void {
    this.fullForm = value;
  }
}
