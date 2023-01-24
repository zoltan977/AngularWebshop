import { TestBed } from '@angular/core/testing';

import { FilterValuesService } from './filter-values.service';

describe('FilterValuesService', () => {
  let service: FilterValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
