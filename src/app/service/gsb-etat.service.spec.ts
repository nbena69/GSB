import { TestBed } from '@angular/core/testing';

import { GsbEtatService } from './gsb-etat.service';

describe('GsbEtatService', () => {
  let service: GsbEtatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbEtatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
