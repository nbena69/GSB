import { TestBed } from '@angular/core/testing';

import { GsbFraishorsforfaitService } from './gsb-fraishorsforfait.service';

describe('GsbFraishorsforfaitService', () => {
  let service: GsbFraishorsforfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbFraishorsforfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
