import { TestBed } from '@angular/core/testing';

import { BookingserviceService } from './bookingservice.service';

describe('BookingserviceService', () => {
  let service: BookingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
