import { TestBed } from '@angular/core/testing';

import { AdminSignupService } from './admin-signup.service';

describe('AdminSignupService', () => {
  let service: AdminSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
