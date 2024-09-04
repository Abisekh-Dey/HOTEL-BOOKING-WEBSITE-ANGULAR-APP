import { TestBed } from '@angular/core/testing';

import { AdminlistService } from './adminlist.service';

describe('AdminlistService', () => {
  let service: AdminlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
