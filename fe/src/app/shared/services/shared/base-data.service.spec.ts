import { TestBed } from '@angular/core/testing';
import { UserAccountData, UserAccountFormModel } from 'src/app/membership/models/user-account-model';

import { BaseDataService } from './base-data.service';

describe('BaseDataService', () => {
  let service: BaseDataService<UserAccountFormModel, UserAccountData>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
