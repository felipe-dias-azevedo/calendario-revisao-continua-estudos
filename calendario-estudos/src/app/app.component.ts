import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './animation.css', './responsive.css']
})
export class AppComponent {
  title = 'calendario-estudos';

  months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  daysList: any;
  currentMonth!: string;

  goToToday(v: any): void {

  }

  nextMonth() {

  }

  previousMonth() {

  }

  filterSearch() {

  }

  showModal(v: any): void {

  }
}
