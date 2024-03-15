import { TestBed } from '@angular/core/testing';

import { GsbActiviteService } from './gsb-activite.service';

describe('GsbActiviteService', () => {
  let service: GsbActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
