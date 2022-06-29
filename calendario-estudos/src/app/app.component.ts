import {Component, OnInit} from '@angular/core';
import {ShowModal} from "./shared/show-modal/show-modal";
import {StateModalShownService} from "./shared/show-modal/state-modal-shown.service";
import {months} from "./shared/months";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './animation.css', './responsive.css']
})
export class AppComponent implements OnInit {

  title = 'calendario-estudos';

  private now!: Date;
  private monthsForward!: number;

  subjectPerDayList: any;
  currentMonth!: string;
  textFilter!: string

  isModalShown!: ShowModal

  constructor(private modalShownService: StateModalShownService) {}

  ngOnInit(): void {
    this.modalShownService.modalShown.subscribe(s => this.isModalShown = s);

    this.now = new Date();
    this.monthsForward = 0;
    this.textFilter = "";

    this.updateMonth();
  }

  private updateMonth() {
    const actualMonth = this.now.getMonth() + this.monthsForward;
    this.currentMonth = months[actualMonth];

    // let studiesDayList = document.getElementById('studies-day-list');
    // let studiesDaysData = "";
    // const materias = localStorage.getItem('materias');
    // const jsonMaterias = JSON.parse(materias);
    // const subjects = localStorage.getItem('subjects');
    // const jsonSubjects = JSON.parse(subjects);
    // for (let i = 1; i <= daysInMonth(actualMonth+1, current.getFullYear()); i++) {
    //   if (jsonSubjects !== null) {
    //     const subjectsToday = jsonSubjects
    //       .filter(s => s.date === toFormat(new Date(current.getFullYear(), actualMonth, i)))
    //       .filter(s => s.subject.toLowerCase().includes(textFilter))
    //       .map(s => studyDay(
    //         s.id,
    //         s.subject,
    //         jsonMaterias[s.materia] === undefined ? '#000000' : jsonMaterias[s.materia].color,
    //         textColorFrom(jsonMaterias[s.materia] === undefined ? '#000000' : jsonMaterias[s.materia].color)))
    //       .join('');
    //     studiesDaysData += studyDayList(i, subjectsToday);
    //   } else {
    //     studiesDaysData += studyDayList(i, "");
    //   }
    // }
    // studiesDayList.innerHTML = studiesDaysData;
    // if (monthsForward === 0) {
    //   document.getElementById(`dia-${current.getDate()}`).classList.add('today-study-day');
    // }
  }

  goToTodayTitle(): void {
    if (window.innerWidth >= 700) {
      return;
    }
    this.toToday();
  }

  goToToday(): void {
    this.toToday();
  }

  private toToday() {
    this.monthsForward = 0;
    this.updateMonth();

    const today = this.now.getDate();

    const smoothness: ScrollOptions = { behavior: 'smooth' };

    if ([1, 2].includes(today)) {
      window.scrollTo({ top: 0, ...smoothness });
      return;
    }

    document.getElementById(`dia-${today-2}`)?.scrollIntoView(smoothness);
  }

  nextMonth(): void {
    if (this.now.getMonth() + (this.monthsForward + 1) > 11) {
      return;
    }

    this.monthsForward++;
    this.updateMonth();
  }

  previousMonth(): void {
    if (this.now.getMonth() + (this.monthsForward - 1) < 0) {
      return;
    }

    this.monthsForward--;
    this.updateMonth();
  }

  filterSearch() {
    this.updateMonth();
  }

  showRemoveModal() {
    this.modalShownService.updateState({ remove: true });
  }

  showAddModal() {
    this.modalShownService.updateState({ add: true });
  }
}
