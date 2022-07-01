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

  getById(id: string): Subject | null {
    return this.contextStorageService.getById(this.key, id);
  }

  add(subject: NewSubject): void {
    this.contextStorageService.add(this.key, subject);
  }

  addInDays(subject: NewSubject, days: number[]): void {
    const subjects = days.map(d => {
      const date = subject.date.addDays(d).clone();
      return {...subject, date};
    });

    for (const s of subjects) {
      this.add(s);
    }
  }

  delete(id: string): void {
    this.contextStorageService.delete(this.key, id);
  }
}
