import { NgModule } from '@angular/core';
import { AngularBookingCalendarComponent } from './angular-booking-calendar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AngularBookingCalendarComponent],
  exports: [AngularBookingCalendarComponent]
})
export class AngularBookingCalendarModule { }
