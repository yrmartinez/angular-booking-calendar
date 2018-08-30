import { Component, OnInit, Input } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;
@Component({
  selector: 'lib-angular-booking-calendar',
  templateUrl: 'angular-booking-calendar.component.html',
  styleUrls: ['angular-booking-calendar.component.css']
})
export class AngularBookingCalendarComponent implements OnInit {
  monthToDisplay: string;
  month: moment_.Moment;
  days = [];
  @Input()
  weekDaysOff: number[] = [];
  @Input()
  daysOff: any[] = [];
  @Input()
  disableBackButton = false;
  @Input()
  disableNextButton = false;
  daysOfWeek: any[];
  @Input()
  cssDaysOfSurroundingMonths = 'picker-empty';
  yearsForSelect: any[] = [];
  monthsForSelect: any[] = [];
  sundayFirstDay: any;
  yearToDisplay: string;
  @Input()
  changeYearPast: number;
  @Input()
  changeYearFuture: number;
  monthClick: any;
  monthChanged: any;
  select: any = {};
  @Input()
  showDaysOfSurroundingMonths = false;
  @Input()
  fireEventsForDaysOfSurroundingMonths = false;
  dayClick: any;
  @Input()
  enableSelectMonth: boolean;
  @Input()
  highlightDays: any[] = [];
  @Input()
  daysAllowed: any[];
  @Input()
  disableDaysAfter: any;
  @Input()
  allDaysOff = false;
  @Input()
  disableDaysBefore: any;
  @Input()
  disallowBackPastMonths = false;
  @Input()
  disallowGoFuturMonths = false;
  previousDay: moment_.Moment;
  @Input()
  disableNavigation: boolean;
  isMousePressed = false;
  isFirstClick = true;
  toogleMonthText: string;
  @Input()
  blockAllMonthText: string;
  @Input()
  unblockAllMonthText: string;
  @Input()
  oneYearOnly = false;
  isMonthBlocked = false;
  constructor() {}

  ngOnInit() {
    const self = this;
    document.body.onmousedown = function() {
      self.isMousePressed = true;
    };

    document.body.onmouseup = function() {
      self.isMousePressed = false;
      self.isFirstClick = true;
    };

    this.month = moment().startOf('day');
    this.select.month = moment(this.month).format('MMMM');
    this.select.year = moment(this.month).format('YYYY');
    this.monthToDisplay = this.getMonthYearToDisplay();
    this.daysOfWeek = this.getDaysOfWeek();
    this.yearToDisplay = this.month.format('YYYY');
    this.monthsForSelect = moment.months();
    this.yearsForSelect = this.getYearsForSelect();
    this.days = this.initDays();
    this.checkToggleMonthText();
  }

  checkToggleMonthText(): any {
    if (
      this.days
        .filter(d => d.selectable && !d.mdp.otherMonth)
        .every(d => d.mdp.selected && d.selectable && !d.mdp.otherMonth)
    ) {
      this.toogleMonthText = this.unblockAllMonthText
        ? this.unblockAllMonthText
        : 'Unblock this Month';
      this.isMonthBlocked = true;
    } else {
      this.toogleMonthText = this.blockAllMonthText
        ? this.blockAllMonthText
        : 'Block this Month';
      this.isMonthBlocked = false;
    }
  }

  createDate(defaultSelected = false) {
    const now = moment();

    const day = {
      date: moment(this.previousDay.add(1, 'day')),
      mdp: {
        selected: false,
        today: false,
        past: false,
        future: false,
        otherMonth: false
      },
      css: '',
      title: '',
      selectable: true
    };
    if (this.highlightDays) {
      const hlDay = this.highlightDays.filter(function(d) {
        return day.date.isSame(d.date, 'day');
      });
      day.css = hlDay.length > 0 ? hlDay[0].css : '';
      day.title = hlDay.length > 0 ? hlDay[0].title : '';
    }
    day.selectable = !this.isDayOff(day);
    day.mdp.selected =
      day.selectable && (this.isSelected(day) || defaultSelected);
    day.mdp.today = day.date.isSame(now, 'day');
    day.mdp.past = day.date.isBefore(now, 'day');
    day.mdp.future = day.date.isAfter(now, 'day');
    if (!day.date.isSame(this.month, 'month')) {
      day.mdp.otherMonth = true;
    }
    return day;
  }

  isSelected(day): boolean {
    return this.highlightDays.some(function(d) {
      return day.date.isSame(d.date, 'day');
    });
  }

  initDays(defaultSelected = false): any[] {
    this.previousDay = moment(this.month)
      .date(0)
      .day(this.sundayFirstDay ? 0 : 1)
      .subtract(1, 'day');
    const days = [];
    const firstDayOfMonth = moment(this.month).date(1);
    const lastDay = moment(firstDayOfMonth).endOf('month');
    let maxDays = lastDay.diff(this.previousDay, 'days');
    const lastDayOfWeek = this.sundayFirstDay ? 6 : 0;

    if (lastDay.day() !== lastDayOfWeek) {
      maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
    }

    for (let j = 0; j < maxDays; j++) {
      days.push(this.createDate(defaultSelected));
    }
    this.checkNavigationButtons();
    return days;
  }

  isDayOff(day) {
    return (
      this.allDaysOff ||
      (!!this.disableDaysBefore &&
        moment(day.date).isBefore(this.disableDaysBefore, 'day')) ||
      (!!this.disableDaysAfter &&
        moment(day.date).isAfter(this.disableDaysAfter, 'day')) ||
      this.weekDaysOff.some(function(dayOff) {
        return day.date.day() === dayOff;
      }) ||
      this.daysOff.some(function(dayOff) {
        return day.date.isSame(dayOff, 'day');
      }) ||
      (this.daysAllowed &&
        !this.daysAllowed.some(function(dayAllowed) {
          return day.date.isSame(dayAllowed, 'day');
        })) ||
      this.highlightDays.some(function(highlightDay) {
        return (
          day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable
        );
      })
    );
  }

  changeYear(year) {
    this.month = this.month.year(parseInt(year, 10));
  }

  getMonthYearToDisplay(): string {
    const month = this.month.format('MMMM');
    return month.charAt(0).toUpperCase() + month.slice(1);
  }

  getDaysOfWeek(): any[] {
    /*To display days of week names in moment.lang*/
    const momentDaysOfWeek = moment()
      .localeData()
      .weekdaysMin();
    const days = [];

    for (let i = 1; i < 7; i++) {
      days.push(momentDaysOfWeek[i]);
    }

    if (this.sundayFirstDay) {
      days.splice(0, 0, momentDaysOfWeek[0]);
    } else {
      days.push(momentDaysOfWeek[0]);
    }

    return days;
  }

  getYearsForSelect = function() {
    const now = moment();
    this.changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0);
    this.changeYearFuture = Math.max(
      0,
      parseInt(this.changeYearFuture, 10) || 0
    );
    const min = moment(this.month).subtract(this.changeYearPast, 'year'),
      max = moment(this.month).add(this.changeYearFuture, 'year'),
      result = [];
    max.add(1, 'year');
    for (const m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
      if (
        (!this.disallowBackPastMonths ||
          (m.isAfter(now, 'year') || m.isSame(now, 'year'))) &&
        (!this.disallowGoFuturMonths ||
          (m.isBefore(now, 'year') || m.isSame(now, 'year')))
      ) {
        result.push(m.format('YYYY'));
      }
    }
    return result;
  };

  changeMonth(event, disable, add) {
    if (disable) {
      return;
    }

    event.preventDefault();

    let prevented = false;

    event.preventDefault = function() {
      prevented = true;
    };

    const monthTo = moment(this.month).add(add, 'month');

    this.month = monthTo;

    this.monthToDisplay = this.getMonthYearToDisplay();

    this.yearToDisplay = this.month.format('YYYY');

    this.days = this.initDays();

    if (typeof this.monthClick === 'function') {
      this.monthClick(event, monthTo);
    }

    if (!prevented) {
      this.updateMonth(monthTo);
    }

    this.checkToggleMonthText();
  }

  changeMonthBySelect(monthName) {
    this.updateMonth(moment(this.month).month(monthName));
  }

  updateMonth(monthTo) {
    const oldMonth = moment(this.month);
    this.month = monthTo;
    this.select.month = monthTo.format('MMMM');

    this.days = this.initDays();

    if (typeof this.monthChanged === 'function') {
      this.monthChanged(this.month, oldMonth);
    }
  }

  getDayClasses(day) {
    let css = '';
    if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
      css += ' ' + day.css;
    }
    if (this.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
      css += ' ' + this.cssDaysOfSurroundingMonths;
    }
    if (day.mdp.selected) {
      css += ' picker-selected';
    }
    if (!day.selectable) {
      css += ' picker-off';
    }
    if (day.mdp.today) {
      css += ' today';
    }
    if (day.mdp.past) {
      css += ' past';
    }
    if (day.mdp.future) {
      css += ' future';
    }
    if (day.mdp.otherMonth) {
      css += ' picker-other-month';
    }
    if (day.date.weekday() === 0) {
      css += ' sunday';
    }
    return css;
  }

  isSunday (day): boolean {
    return moment().isoWeekday(day).weekday() === 0;
  }

  toggleDay(event, day) {
    if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
      return;
    }

    if (typeof this.dayClick === 'function') {
      this.dayClick(event, day);
    }

    if (day.selectable) {
      day.mdp.selected = !day.mdp.selected;
      if (day.mdp.selected) {
        this.highlightDays.push(day);
      } else {
        let idx = -1;
        for (let i = 0; i < this.highlightDays.length; ++i) {
          if (moment.isMoment(this.highlightDays[i].date)) {
            if (this.highlightDays[i].date.isSame(day.date, 'day')) {
              idx = i;
              break;
            }
          } else {
            if (this.highlightDays[i].date.isSame(day.date, 'day')) {
              idx = i;
              break;
            }
          }
        }
        if (idx !== -1) {
          this.highlightDays.splice(idx, 1);
        }
      }
    }
  }

  hoverDay(event, day) {
    event.preventDefault();
    let prevented = false;

    if (!this.isMousePressed && !this.isFirstClick) {
      return;
    }

    event.preventDefault = function() {
      prevented = true;
    };

    if (typeof this.dayHover === 'function') {
      this.dayHover(event, day);
    }

    if (!prevented) {
      day.mdp.hover = event.type === 'mouseover';
    }
  }

  leaveDay(event, day) {
    event.preventDefault();
    let prevented = false;

    if (this.isMousePressed && this.isFirstClick) {
      this.isFirstClick = false;
      if (typeof this.dayHover === 'function') {
        this.dayHover(event, day);
      }
    }

    event.preventDefault = function() {
      prevented = true;
    };

    if (!prevented) {
      day.mdp.hover = event.type === 'mouseover';
    }
  }

  dayHover(event, day) {
    if (this.isMousePressed) {
      this.toggleDay(event, day);
    }
  }

  checkNavigationButtons() {
    const today = moment(),
      previousMonth = moment(this.month).subtract(1, 'month'),
      nextMonth = moment(this.month).add(1, 'month');
    this.disableBackButton =
      this.disableNavigation ||
      (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month')) ||
      (this.oneYearOnly && this.month.month() === 0);
    this.disableNextButton =
      this.disableNavigation ||
      (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month')) ||
      (this.oneYearOnly && this.month.month() === 11);
  }

  blockCurrentMonth() {
    this.isMonthBlocked
      ? this.days
          .filter(d => !d.mdp.otherMonth && d.mdp.selected)
          .forEach(day => this.toggleDay(null, day))
      : this.days
          .filter(d => d.selectable && !d.mdp.otherMonth && !d.mdp.selected)
          .forEach(day => this.toggleDay(null, day));
    this.checkToggleMonthText();
  }
}
