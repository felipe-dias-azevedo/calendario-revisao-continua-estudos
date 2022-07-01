import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IdentifiableContext} from "../../shared/context-storage/identifiable-context";
import {Subject} from "../../subject/subject";
import {SubjectService} from "../../subject/subject.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifyService} from "../../shared/notify/notify.service";
import {Subtopic} from "../../subtopic/subtopic";
import {Materia} from "../../materia/materia";
import {SubtopicService} from "../../subtopic/subtopic.service";
import {MateriaService} from "../../materia/materia.service";

@Component({
  selector: 'app-modal-details-subject',
  templateUrl: './modal-details-subject.component.html',
  styleUrls: ['./modal-details-subject.component.css']
})
export class ModalDetailsSubjectComponent implements OnInit {

  subject!: Subject;
  subtopic!: Subtopic | null;
  materia!: Materia | null;

  constructor(
    private dialogRef: MatDialogRef<ModalDetailsSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IdentifiableContext,
    private subjectService: SubjectService,
    private subtopicService: SubtopicService,
    private materiaService: MateriaService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    const subject = this.subjectService.getById(this.data.id);

    if (subject === null) {
      this.notifyService.show('Não foi possível obter os dados desta disciplina');
      this.dialogRef.close();
    }

    this.subject = subject!;
    this.materia = this.materiaService.getById(this.subject.materiaId);
    this.subtopic = this.subtopicService.getById(this.subject.subtopicId);
  }

  deleteSubject() {

  }
}
