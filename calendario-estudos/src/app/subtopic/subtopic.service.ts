import { Injectable } from '@angular/core';
import {ContextStorageService} from "../shared/context-storage/context-storage.service";
import {NewSubtopic, Subtopic} from "./subtopic";

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  private key = 'subtopics';

  constructor(private contextStorageService: ContextStorageService<Subtopic, NewSubtopic>) { }

  get(): Subtopic[] {
    return this.contextStorageService.get(this.key);
  }

  add(materia: NewSubtopic): void {
    this.contextStorageService.add(this.key, materia);
  }

  delete(id: string): void {
    this.contextStorageService.delete(this.key, id);
  }
}
