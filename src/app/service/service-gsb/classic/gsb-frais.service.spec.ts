import { TestBed } from '@angular/core/testing';

import { GsbFraisService } from './gsb-frais.service';

describe('GsbFraisService', () => {
  let service: GsbFraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbFraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
