import {Injectable} from "@angular/core";
import {ApiService} from "./api";
import {Observable} from "rxjs/Rx";

@Injectable()
export class NoteService {
  private path:string = '/notes';

  constructor(private apiService:ApiService) {}

  createNote(note):Observable<any> {
    return this.apiService.post(this.path, note);
  }

  getNotes():Observable<any> {
    return this.apiService.get(this.path);
  }

  completeNote(note):Observable<any> {
    return this.apiService.delete(`${this.path}/${note.id}`);
  }
}
