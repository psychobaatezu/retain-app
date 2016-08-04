import {Injectable} from "@angular/core";
import {ApiService} from "./api";
import {Observable} from "rxjs/Rx";
import {StoreHelper} from "./store-helper";

@Injectable()
export class NoteService {
  private path: string = '/notes';

  constructor(private apiService: ApiService,
              private storeHelper: StoreHelper) {}

  createNote(note): Observable<any> {
    return this.apiService.post(this.path, note)
        .do(savedNote => this.storeHelper.add('notes', savedNote));
  }

  getNotes(): Observable<any> {
    return this.apiService.get(this.path)
        .do(res => this.storeHelper.update('notes', res.data));
  }

  completeNote(note): Observable<any> {
    return this.apiService.delete(`${this.path}/${note.id}`)
        .do(res => this.storeHelper.findAndDelete('notes', res.id));
  }
}
