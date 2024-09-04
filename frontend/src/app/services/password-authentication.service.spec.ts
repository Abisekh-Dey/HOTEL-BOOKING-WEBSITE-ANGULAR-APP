import { TestBed } from '@angular/core/testing';

import { PasswordAuthenticationService } from './password-authentication.service';

describe('PasswordAuthenticationService', () => {
  let service: PasswordAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
