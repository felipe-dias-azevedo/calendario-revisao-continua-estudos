import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
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
