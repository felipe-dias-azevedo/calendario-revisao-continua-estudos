import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IdentifiableContext} from "../../shared/context-storage/identifiable-context";

@Component({
  selector: 'app-modal-details-subject',
  templateUrl: './modal-details-subject.component.html',
  styleUrls: ['./modal-details-subject.component.css']
})
export class ModalDetailsSubjectComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IdentifiableContext
  ) { }

  ngOnInit(): void {
  }

}
