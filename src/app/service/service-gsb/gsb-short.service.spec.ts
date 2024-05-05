import { TestBed } from '@angular/core/testing';

import { GsbShortService } from './gsb-short.service';

describe('GsbShortService', () => {
  let service: GsbShortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbShortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
