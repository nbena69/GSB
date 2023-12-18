import { TestBed } from '@angular/core/testing';

import { GsbVisiteurService } from './gsb-visiteur.service';

describe('GsbVisiteurService', () => {
  let service: GsbVisiteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbVisiteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
