import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-studies-day-list',
  templateUrl: './studies-day-list.component.html',
  styleUrls: ['./studies-day-list.component.css']
})
export class StudiesDayListComponent implements OnInit {
  @Input() day: any;
  @Input() subjectsToday: any;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(v: string, x: string): void {

  }
}
