import { TestBed } from '@angular/core/testing';

import { GsbAffectationService } from './gsb-affectation.service';

describe('GsbAffectationService', () => {
  let service: GsbAffectationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbAffectationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
