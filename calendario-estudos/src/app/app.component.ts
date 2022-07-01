import {Component, OnInit} from '@angular/core';
import {months} from "./shared/months";
import {SubtopicService} from "./subtopic/subtopic.service";
import {SubjectService} from "./subject/subject.service";
import {MateriaService} from "./materia/materia.service";
import {StudiesDaysList, StudyDay, StudyDayContent} from "./studies-day-list/studies-day-list";
import {Subject} from "./subject/subject";
import {MatDialog} from "@angular/material/dialog";
import {ModalAddComponent} from "./modal/add/modal-add.component";
import {ModalRemoveComponent} from "./modal/remove/modal-remove.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './animation.css', './responsive.css']
})
export class AppComponent implements OnInit {

  title = 'calendario-estudos';

  private now!: Date;
  private monthsForward!: number;

  subjectPerDayList!: StudiesDaysList;
  currentMonth!: string;
  textFilter!: string

  constructor(
    private dialog: MatDialog,
    private subjectService: SubjectService,
    private subtopicService: SubtopicService,
    private materiaService: MateriaService
  ) {}

  ngOnInit(): void {
    this.now = new Date();
    this.monthsForward = 0;
    this.textFilter = "";

    this.updateMonth();
  }

  // TODO: Make static and to date helpers (or date extension)
  private daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  // TODO: Make static and to date helpers (or date extension)
  private equals(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  // TODO: Make static and to color helpers
  private getTextColorFrom(backgroundColor: string) {
    let colorHexa = backgroundColor.split("#")[1];
    let rgb = [
      parseInt(colorHexa.slice(0,2), 16),
      parseInt(colorHexa.slice(2,4), 16),
      parseInt(colorHexa.slice(4,6), 16)
    ];
    const brightness = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
    return brightness > 50 ? 'black' : 'white';
  }

  private getStudyDayForDay(day: number, month: number, subjects: Subject[]): StudyDay {
    if (subjects.length == 0) {
      return { day, content: [] };
    }

    const subjectsForDay = subjects
      .filter(s => this.equals(s.date, new Date(this.now.getFullYear(), month, day)))
      .filter(s => s.name.toLowerCase().includes(this.textFilter))
      .map(s => {
        const materia = this.materiaService.getById(s.materiaId);
        const color = materia === null ? '#000000' : materia.color;
        const studyDay: StudyDayContent = {
          subject: s,
          color,
          textColor: this.getTextColorFrom(color)
        }
        return studyDay;
      });
    return { day, content: subjectsForDay };
  }

  private updateMonth() {
    const actualMonth = this.now.getMonth() + this.monthsForward;
    this.currentMonth = months[actualMonth];

    let studiesDaysData: StudiesDaysList = [];
    const subjects = this.subjectService.get();

    for (let day = 1; day <= this.daysInMonth(actualMonth, this.now.getFullYear()); day++) {
      const studyDay = this.getStudyDayForDay(day, actualMonth, subjects);
      studiesDaysData = [studyDay, ...studiesDaysData]
    }

    this.subjectPerDayList = studiesDaysData.sort((a, b) => +a.day - +b.day);
  }

  isTodayStudyDay(day: number): boolean {
    return this.monthsForward === 0 && this.now.getDate() == day;
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
    const modalRemove = this.dialog.open(ModalRemoveComponent);

    modalRemove.afterClosed().subscribe(() => this.updateMonth());
  }

  showAddModal() {
    const modalAdd = this.dialog.open(ModalAddComponent, { height: '90%', width: '60%' });

    modalAdd.afterClosed().subscribe(() => this.updateMonth());
  }
}
