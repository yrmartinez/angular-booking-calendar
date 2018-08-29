import { TestBed, inject } from '@angular/core/testing';

import { AngularBookingCalendarService } from './angular-booking-calendar.service';

describe('AngularBookingCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularBookingCalendarService]
    });
  });

  it('should be created', inject([AngularBookingCalendarService], (service: AngularBookingCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
