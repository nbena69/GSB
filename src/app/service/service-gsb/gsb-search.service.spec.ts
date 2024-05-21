import { TestBed } from '@angular/core/testing';

import { GsbSearchService } from './gsb-search.service';

describe('GsbSearchService', () => {
  let service: GsbSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsbSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
