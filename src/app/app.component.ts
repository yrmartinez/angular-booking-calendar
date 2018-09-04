import { Component, OnInit } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'booking-calendar';
  myDays: any[] = [];

  ngOnInit() {
    this.myDays = [
      {
        date: moment()
          .date(2),
        css: 'holiday',
        selectable: true,
        title: 'Holiday time !'
      },
      {
        date: moment()
          .date(14),
        selectable: true,
        title: 'We don\'t work today'
      },
      {
        date: moment()
          .date(25),
        selectable: true,
        title: 'I\'m thir... i\'m 28, seriously, I mean ...'
      }
    ];
  }
}
