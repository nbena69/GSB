import { TestBed } from '@angular/core/testing';

import { GsbAuthService } from './gsb-auth.service';

describe('GsbAuthService', () => {
  let service: GsbAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
