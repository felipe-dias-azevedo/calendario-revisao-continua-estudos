import {Injectable} from '@angular/core';
import {ContextStorageService} from "../shared/context-storage/context-storage.service";
import {NewSubject, Subject} from "./subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private key = 'subjects';

  constructor(
    private contextStorageService: ContextStorageService<Subject, NewSubject>
  ) { }

  get(): Subject[] {
    return this.contextStorageService.get(this.key)
      .map(s => {
        return {...s, date: new Date(s.date)}
      });
  }

  add(materia: NewSubject): void {
    this.contextStorageService.add(this.key, materia);
  }

  delete(id: string): void {
    this.contextStorageService.delete(this.key, id);
  }
}
