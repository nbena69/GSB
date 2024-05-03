import { TestBed } from '@angular/core/testing';

import { GsbAllService } from './gsb-all.service';

describe('GsbAllService', () => {
  let service: GsbAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
