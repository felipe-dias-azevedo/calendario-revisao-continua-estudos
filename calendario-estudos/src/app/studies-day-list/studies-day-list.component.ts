import {Component, Input, OnInit} from '@angular/core';
import {StudyDayContent} from "./studies-day-list";
import {StateModalShownService} from "../shared/show-modal/state-modal-shown.service";

@Component({
  selector: '[app-studies-day-list]',
  templateUrl: './studies-day-list.component.html',
  styleUrls: ['./studies-day-list.component.css']
})
export class StudiesDayListComponent implements OnInit {

  @Input() day!: number;
  @Input() subjectsToday!: StudyDayContent[];

  constructor(
    private modalShownService: StateModalShownService
  ) { }

  ngOnInit(): void {
  }

  showDetailsModal(id: string): void {
    this.modalShownService.updateState({ detailsSubject: true });
  }
}
