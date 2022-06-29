import {Injectable} from '@angular/core';
import {Materia, NewMateria} from "./materia";
import {ContextStorageService} from "../shared/context-storage/context-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private key = 'materias';

  constructor(private contextStorageService: ContextStorageService<Materia, NewMateria>) { }

  get(): Materia[] {
    return this.contextStorageService.get(this.key);
  }

  add(materia: NewMateria): void {
    this.contextStorageService.add(this.key, materia);
  }

  delete(id: string): void {
    this.contextStorageService.delete(this.key, id);
  }
}
