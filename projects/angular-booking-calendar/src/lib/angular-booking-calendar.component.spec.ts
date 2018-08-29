import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularBookingCalendarComponent } from './angular-booking-calendar.component';

describe('AngularBookingCalendarComponent', () => {
  let component: AngularBookingCalendarComponent;
  let fixture: ComponentFixture<AngularBookingCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularBookingCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularBookingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
