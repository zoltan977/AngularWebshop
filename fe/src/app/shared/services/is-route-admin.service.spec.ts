import { TestBed } from '@angular/core/testing';

import { IsRouteAdmin } from './is-route-admin.service';

describe('IsRouteAdmin', () => {
  let service: IsRouteAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsRouteAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
