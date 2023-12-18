import { TestBed } from '@angular/core/testing';

import { GsbUserService } from './gsb-user.service';

describe('GsbUserService', () => {
  let service: GsbUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
