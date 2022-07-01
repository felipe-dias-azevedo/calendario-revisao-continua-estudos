import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-remove',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.css']
})
export class ModalRemoveComponent implements OnInit {
  removeContent!: string;

  constructor() { }

  ngOnInit(): void {
  }

  deleteSubtopic() {

  }

  deleteMateria() {

  }

  closeModal(v: any) {

  }

  changeActiveTagModal(v: any) {

  }
}
