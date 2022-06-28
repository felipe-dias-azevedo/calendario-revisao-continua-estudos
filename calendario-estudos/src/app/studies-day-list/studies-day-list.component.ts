import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studies-day-list',
  templateUrl: './studies-day-list.component.html',
  styleUrls: ['./studies-day-list.component.css']
})
export class StudiesDayListComponent implements OnInit {
  day: any;
  studyDayList: any;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(v: string, x: string): void {

  }
}
