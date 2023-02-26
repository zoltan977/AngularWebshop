import { TestBed } from '@angular/core/testing';

import { CheckoutFormsValuesService } from './checkout-forms-values.service';

describe('CheckoutFormsValuesService', () => {
  let service: CheckoutFormsValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutFormsValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
