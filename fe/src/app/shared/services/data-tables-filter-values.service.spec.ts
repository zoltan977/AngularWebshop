import { TestBed } from '@angular/core/testing';

import { DataTablesFilterValuesService } from './data-tables-filter-values.service';

describe('DataTablesFilterValuesService', () => {
  let service: DataTablesFilterValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTablesFilterValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
