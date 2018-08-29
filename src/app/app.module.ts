import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularBookingCalendarModule } from 'angular-booking-calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularBookingCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
