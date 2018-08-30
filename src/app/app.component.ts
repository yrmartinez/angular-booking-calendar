import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking-calendar';
  myDays: any[] = [];

  logDays() {
    console.log(this.myDays);
  }
}
