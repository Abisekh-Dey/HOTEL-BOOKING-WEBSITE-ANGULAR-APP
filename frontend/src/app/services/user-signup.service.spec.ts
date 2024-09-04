import { TestBed } from '@angular/core/testing';

import { UserSignupService } from './user-signup.service';

describe('UserSignupService', () => {
  let service: UserSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
